import Editor from '../components/EditorComponent';
import { postRecipe } from '../utils/api_request';

export default function CreateRecipe() {
  return (
    <Editor apiFunc={postRecipe} title="レシピを作る" action="レシピ作成" />
  );
};
