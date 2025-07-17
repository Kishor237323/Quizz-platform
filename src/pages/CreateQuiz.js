import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/select-quiz", { replace: true });
  }, [navigate]);
  return null;
}
