import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function LayersForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setNotification } = useStateContext();

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // se for edição, carrega os dados da camada
  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/layers/${id}`)
        .then(({ data }) => {
          setName(data.name);
        })
        .catch(() => setErrors({ load: ["Erro ao carregar camada."] }))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("geojson", file);
    }

    setSaving(true);
    setErrors(null);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const request = id
      ? axiosClient.post(`/layers/${id}?_method=PUT`, formData, config)
      : axiosClient.post("/layers", formData, config);

    request
      .then(() => {
        setNotification(
          id ? "Camada atualizada com sucesso!" : "Camada criada com sucesso!"
        );
        navigate("/layers"); // redireciona para a listagem
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        } else {
          alert("Erro ao salvar camada.");
        }
      })
      .finally(() => setSaving(false));
  };

  return (
    <>
      {id ? <h4>Editar Camada</h4> : <h4>Nova Camada</h4>}

      <div className="card animated fadeInDown mt-2">
        {(loading || saving) && (
          <div className="text-center">
            {loading ? "Carregando..." : "Salvando, aguarde..."}
          </div>
        )}

        {errors && (
          <div className="alert alert-danger">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        {!loading && !saving && (
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-10">
                <label className="form-label">Nome da camada</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Bairros de Fortaleza"
                  required
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-10">
                <label className="form-label">Arquivo GeoJSON:
                  {id && (
                    <>
                      <br />
                      <b>Obs:</b> Mantenha o campo em branco para não alterar
                    </>
                  )}
                </label>
                <input
                  type="file"
                  accept=".geojson,application/geo+json"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                  required={!id}
                />
              </div>
              <div className="col-md-2 ms-auto">
                <label className="form-label">&ensp;</label>
                <button className="btn btn-primary w-100" type="submit">
                  Salvar
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
