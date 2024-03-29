import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteResidence = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .delete("http://localhost:3001/residence/residence/" + id)
      .then((res) => {
        if (res.data.deleted) {
          navigate("/residences");
        }
      })
      .catch((err) => console.log(err));
  }, []);
};

export default DeleteResidence;
