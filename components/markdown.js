import React from 'react';
import { Editor, EditorState, Entity, getDefaultKeyBinding, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw } from 'draft-js';
import createImagePlugin from '@draft-js-plugins/image';
import { Button, Grid } from '@material-ui/core';
import CustomTextField from '../styles/CustomTextField';

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);

    if( this.props.default ) {
      const state = convertFromRaw(JSON.parse(this.props.default));

      this.state = {editorState: EditorState.createWithContent(state), editorEnable: false, imagePlugin: createImagePlugin()};
    } else {
      this.state = {editorState: EditorState.createEmpty(), editorEnable: false, imagePlugin: createImagePlugin()};
    }

    this.editorRef = React.createRef();
    this.urlRef = React.createRef();

    this.focus = () => {
      if( !this.state.editorEnable )
        return;
      
      this.editorRef.focus();
    }
    this.onChange = (editorState) => this.setState({editorState, editorEnable: this.state.editorEnable, imagePlugin: this.state.imagePlugin});

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  componentDidMount() {
    this.setState( { editorEnable: true } );
  }

  // https://daveteu.medium.com/draftjs-insert-paste-images-into-your-content-820159025258
  insertImage() {
    // const url = this.urlRef.current.value;
    const url = this.props.galleryList[this.props.index].original;

    const entityKey = Entity.create( 'image', 'IMMUTABLE', { src: url } );

    const { editorState } = this.state;
    const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

    // console.log(convertToRaw(editorState.getCurrentContent()), convertToRaw(newState.getCurrentContent()), Entity.get(entityKey));

    this.onChange(newState);
  };

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    } else {
      this.props.setContent(JSON.stringify(convertToRaw(contentState)));
    }

    return (
      <>
        {this.state.editorEnable && (<div className="RichEditor-root">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center">
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              {/*<CustomTextField
                id="standard-basic"
                label="挿入するURL"
                inputRef={this.urlRef}
                color="primary"
                focused
                style={{width: '300px', marginTop: '2rem', marginButtom: '2rem', marginLeft: '2rem'}}
              />*/}
              <Button 
                variant="contained"
                color="primary"
                onClick={this.insertImage.bind(this)}
                style={{marginTop: '2rem', marginButtom: '2rem', marginLeft: '1rem'}}
              >
                ギャラリーの画像を挿入
              </Button>
            </Grid>
            <br />
            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.mapKeyToEditorCommand}
                onChange={this.onChange}
                placeholder=""
                ref={input => this.editorRef = input}
                spellCheck={true}
                userSelect="none"
                contentEditable={false}
                handlePastedFiles={this.handlePastedFiles}
                blockRendererFn={mediaBlockRenderer}
                rowsMax={this.props.rowsMax}
              />
            </div>
          </div>)
        }
      </>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

function mediaBlockRenderer(block, flag) {
  if (!flag && block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false
    };
  }

  return null;
}

const Image = (props) => {
  return <img src={props.src} width="640px" />;
};

const Media = (props) => {

  const entity = Entity.get(props.block.getEntityAt(0));

  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'image') {
    media = <Image src={src} />;
  } else {
    media = <></>;
  }

  return media;
};

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default RichEditorExample;