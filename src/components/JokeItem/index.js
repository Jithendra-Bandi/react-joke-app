import './index.css'

const JokeItem = props => {
    const {jokeData} = props;
    return (
        <tr>
            <td>{jokeData.category}</td>
            <td>{jokeData.joke}</td>
        </tr>
    )
}

export default JokeItem;