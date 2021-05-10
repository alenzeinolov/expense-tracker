import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../utils/useAuth";
import AuthContext from "../contexts/AuthContext";

const Expenses = () => {
  useAuth();
  const { token } = useContext(AuthContext);

  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await axios.get("http://localhost:5000/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setExpenses(res.data.data.expenses);
    };
    fetchExpenses();
  }, []);

  return <pre>{JSON.stringify(expenses, null, 2)}</pre>;
};

export default Expenses;
