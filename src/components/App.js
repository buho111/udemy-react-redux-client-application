import Proptypes from "prop-types";

function App() {
  const profiles = [
    {name: "Taro", age: 10},
    {name: "Hanako", age: 5},
    {name: 10}
  ]
  return (
    <>
    {
      profiles.map((profile, index) => {
        return <User name={profile.name} age={profile.age} key={index} />
      })
    }
    </>
  );
}

const User = (props) => {
  return <div>Hi, I am {props.name}, and {props.age} years old.</div>
}

User.propTypes = {
  // eslint-disable-line
  name: PropTypes.string
}
export default App;
