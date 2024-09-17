import "./style.css"


interface ITableData {
    id:number,
    name: string;
    year: string;
    image: string;
    publish:boolean
}

interface IProps {
    data: ITableData[];
    deleteAlbum: (id: number) => void;
    publishAlbum: (id: number) => void;
}

export const AdminAlbum = (props:IProps) => {
    return (
        <div>
            <h1>Альбом</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th className="headTable">Название</th>
          <th className="headTable">Год выпуска</th>
          <th className="headTable">Изображение</th>
          <th className="headTable">Действие</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, index) => (
          <tr key={index}>
            <td style={{fontSize:20}} className="bodyTable">{data.name}</td>
            <td style={{fontSize:20}} className="bodyTable">{data.year}</td>
            <td className="bodyTable">
              <img src={"http://localhost:8000/uploads/" + data.image} alt={data.name} className="bodyImg" />
            </td>
            <td className="bodyTable">
            <button onClick={() => data.publish?props.deleteAlbum(data.id): props.publishAlbum(data.id)} className={data.publish?"btnBodyDelete":"bodyButton"}>
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
