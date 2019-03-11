import React from "react";

class Avatar extends React.Component {
    constructor() {
        super();
        this.baseURL = "https://api.github.com/users";
        this.state = {
            isLoaded1: false,
            isLoaded2: false,
            users: [],
            user: {
                "name": "Tom Preston-Werner",
                "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
                "followers": 21375
            }
        };
        this.update = this.update.bind(this);
        this.getFullName = this.getFullName.bind(this);
    }

    componentDidMount() {
        fetch(this.baseURL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded1: true,
                        users: result
                    })
                },
                (error) => ({
                    isLoaded1: false,
                    error
                })
            )
    }

    update(e) {
        const searchText = e.target.value;
        console.log(searchText);
        console.log(this.state.users);
        this.state.users.map((eachUser, index) => {
            if (eachUser.login.indexOf(e.target.value) > 0) {
                // this.setState({ user: eachUser });
                const name = eachUser.login;
                this.getFullName(name);
            }
            return 0;
        });

    }

    getFullName(name) {
        console.log(name);

        fetch(this.baseURL + "/" + name)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        user: result,
                        isLoaded2: true
                    })
                },
                (error) => ({
                    isLoaded2: false,
                    error
                })
            )
    }

    render() {
        return (
            <div>
                <input type="search" placeholder="search ..." onChange={this.update}></input>
                <br /><br />
                <img src={this.state.user.avatar_url} height="100" width="100" alt="profile"></img>

                <h1>Full Name: {this.state.user.name}</h1>
                <h1>Followers: {this.state.user.followers}</h1>

            </div>
        );
    };
}


export default Avatar;