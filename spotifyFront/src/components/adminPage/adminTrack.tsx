import "./style.css"


interface ITableData {
    name: string;
    id:number
    duration: string;
    image: string;
    publish:boolean
}

interface IProps {
    data: ITableData[];
    deleteTrack: (id: number) => void;
    publishTrack: (id: number) => void;
  }

export const AdminTrack = (props:IProps) => {
    return (
        <div>
            <h1>Трек</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th className="headTable">Название</th>
          <th className="headTable">Длительность</th>
          <th className="headTable">Действие</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, index) => (
          <tr key={index}>
            <td style={{fontSize:20}} className="bodyTable">{data.name}</td>
            <td style={{fontSize:20}} className="bodyTable">{data.duration}</td>
            <td className="bodyTable">
            <button onClick={() => data.publish?props.deleteTrack(data.id): props.publishTrack(data.id)} className={data.publish?"btnBodyDelete":"bodyButton"}>
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
