import * as React from "react";
import { connect } from "react-redux"
import { formatLeaderboardData } from "../utils/helpers";

const Leaderboard = ({ data }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Answers</th> 
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(user => {
                            return(
                                <tr key={user.user}>
                                    <td>
                                        <div className="profileWrapper">
                                            <img alt="Login" src={user.avatarURL} className="leaderboardAvatar" />
                                            <div className="leaderboardUsernameWrapper">
                                                <p className="leaderboardUserName">{user.name}</p>
                                                <p className="leaderboardUserId">{user.user}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.answered}</td>
                                    <td>{user.created}</td>
                                </tr>
                            )
                        })
                    } 
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = ({ users, questions }) => {
    return {
        data: formatLeaderboardData({questions, users})
    }
}

export default connect(mapStateToProps)(Leaderboard);