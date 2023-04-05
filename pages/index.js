import axios from "axios";
import UsersList from "../components/user/usersList";

function HomePage({ data }) {
  return <UsersList 
  // users={data} 
  />;
}
// export async function getServerSideProps() {
//   const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
//   const data = await res.data;
//   console.log(data);
//   return { props: { data } };
// }
export default HomePage;
