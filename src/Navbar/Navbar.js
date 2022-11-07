import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav>
      <div className="Navigation-container">
        <div className="logo">TodoApp</div>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="todo">
            <li>Todos</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
