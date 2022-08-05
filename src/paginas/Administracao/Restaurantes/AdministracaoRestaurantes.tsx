import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

export default function AdministracaoRestaurantes() {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>(`restaurantes/`)
      .then((resp) => {
        setRestaurantes(resp.data)
      })
  })

  function excluir(restaurante: IRestaurante) {
    http.delete(`restaurantes/${restaurante.id}/`)
      .then((resp) => {
        const restauranteLista = restaurantes.filter(restauranteItem=> restauranteItem !== restaurante)
        setRestaurantes(restauranteLista)

      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Deletar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                [<Link to={`/admin/restaurantes/${restaurante.id}`}> Editar</Link>]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}