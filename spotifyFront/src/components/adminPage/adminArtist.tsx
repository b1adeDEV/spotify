import "./style.css"


interface ITableData {
    id:number
    name: string;
    information: string;
    image: string;
    publish:boolean
}

interface IProps {
    data: ITableData[];
    deleteArtist: (id: number) => void;
    publishArtist: (id: number) => void;
}

export const AdminArtist = (props:IProps) => {
    return (
        <div>
            <h1>Artist</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th className="headTable">Имя</th>
          <th className="headTable">Информация</th>
          <th className="headTable">Изображение</th>
          <th className="headTable">Действие</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, index) => (
          <tr key={index}>
            <td className="bodyTable">{data.name}</td>
            <td className="bodyTable">{data.information}</td>
            <td className="bodyTable">
              <img src={"http://localhost:8000/uploads/" + data.image} alt={data.name} className="bodyImg" />
            </td>
            <td className="bodyTable">
            <button onClick={() => data.publish?props.deleteArtist(data.id): props.publishArtist(data.id)} className={data.publish?"btnBodyDelete":"bodyButton"}>
                {
                    data.publish?"Удалить":"Опубликовать"
                }
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div> 
    )
}
