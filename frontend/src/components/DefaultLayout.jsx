import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/home">Mapa Demostrativo</Link>
        <Link to="/layers">Camadas</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Seja bem-vindo {user.name}<br/>
            <b>Gestão de Dados Georreferenciados</b>
          </div>

          <div>
            <Link className="btn-logout" to="/users">Usuários</Link>
            <a onClick={onLogout} className="btn-logout" href="#">Sair com segurança</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
