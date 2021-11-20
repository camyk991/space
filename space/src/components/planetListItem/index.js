import "./planetListItem.css"

const PlanetListItem = ({name, setChosen, id}) => {
    return (
        <div className="planetItemList" onClick={() => {
            setChosen(id)
        }}>
            <span className="planetName">{name}</span>
        </div>
    )
}

export default PlanetListItem;