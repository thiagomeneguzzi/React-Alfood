import { Box, Button, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {

  const parametros = useParams()

  useEffect(() => {
    if(parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((resp) => {
        console.log(resp)
        setNomeRestaurante(resp.data.nome)
      })
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if(parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      }).then(() => {
        alert("Restaurante atualizado!")
      })
    } else {
      http.post(`restaurantes/`, {
        nome: nomeRestaurante
      }).then(() => {
        alert("Restaurante cadastrado!")
      })
    }
    
  }

  return (
    <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center'}}>
      <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField 
          fullWidth
          value={nomeRestaurante} 
          onChange={evento => setNomeRestaurante(evento.target.value)} 
          label="Nome do restaurante" 
          variant="outlined"
          required />
          <Button sx={{ marginTop: 1 }} fullWidth variant="outlined" type="submit">Salvar</Button>
      </Box>
    </Box>
  )
}