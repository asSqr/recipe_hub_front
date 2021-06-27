import Editor from '../components/EditorComponent';
import { postRecipe } from '../utils/api_request';
import Auth from '../components/Auth';
import Header from '../components/Header';

export default function CreateRecipe() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));

    console.log(JSON.parse(localStorage.getItem('user')));
    console.log(user);
  }, []);

  return (
    <>
      <Auth />
      <Header />
      {user && (<Editor apiFunc={postRecipe} title="レシピを作る" action="レシピ作成" user={user} />)}
    </>
  );
};
