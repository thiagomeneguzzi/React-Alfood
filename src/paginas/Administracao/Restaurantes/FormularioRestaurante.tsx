import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function FormularioRestaurante() {

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    axios.post(`http://localhost:8000/api/v2/restaurantes/`, {
      nome: nomeRestaurante
    }).then((resp) => {
      alert("Restaurante cadastrado!")
    })
  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField 
        value={nomeRestaurante} 
        onChange={evento => setNomeRestaurante(evento.target.value)} 
        label="Nome do restaurante" 
        variant="outlined" />
      <Button variant="outlined" type="submit">Cadastrar</Button>
    </form>
  )
}