import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import IPaginacao from '../../interfaces/IPaginacao'

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')

  useEffect(() => {
    // TODO obter restaurantes
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then((resp) => {
        setRestaurantes(resp.data.results)
        setProximaPagina(resp.data.next)
      })
  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resp) => {
        setRestaurantes([...restaurantes, ...resp.data.results])
        setProximaPagina(resp.data.next)
      })
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {proximaPagina && (
        <button onClick={verMais}>Ver mais</button>
      )}
    </section>
  )
}

export default ListaRestaurantes