import React from "react";

class Avatar extends React.Component {
    constructor() {
        super();
        this.state = {searchText: "mojombo", name: "Hunter Keng", followers: 100};
        this.update = this.update.bind(this);
    }

    update(e) {
        console.log(e.target.value);
    }

    render() {
        return (
            <div>
                <input type="search" placeholder="search ..." onChange={this.update}></input>
                <br></br>
                <img src="https://avatars0.githubusercontent.com/u/1?v=4" height="100" width="100" alt="profile"></img>

                <h1>Full Name: {this.state.name}</h1>
                <h1>Followers: {this.state.followers}</h1>

            </div>
        );
    };
}


export default Avatar;