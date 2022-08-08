import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

export default function AdministracaoPratos() {

  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>(`pratos/`)
      .then((resp) => {
        setPratos(resp.data)
      })
  })

  function excluir(prato: IPrato) {
    http.delete(`pratos/${prato.id}/`)
      .then((resp) => {
        const pratoLista = pratos.filter(pratoItem=> pratoItem !== prato)
        setPratos(pratoLista)

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
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
          {pratos.map((prato) => (
            <TableRow>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                [<a href={prato.imagem} rel="noreferrer" target="_black">Ver imagem</a>]
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}`}> Editar</Link>]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}