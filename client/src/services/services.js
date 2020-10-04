import axios from "axios";
import { host } from "../config/config";

exports.getEntries = () => {
  axios
    .get(`${host}/api/entries`)
    .then((res) => setEntries(res.data.data))
    .catch((err) => console.log(err));
};

exports.deleteEntry = (id) => {
  axios
    .delete(`${host}/api/entries/${id}`)
    .then(() => fetchData())
    .catch((err) => console.log(err));
};

exports.createEntry = () => {
  axios
    .post(`${host}/api/entries`, {
      title: "test",
      description: "testing",
      date: new Date(),
    })
    .then(() => {
      fetchData();
      navigation.navigate("Diario");
    })
    .catch((err) => console.log(err));
};
