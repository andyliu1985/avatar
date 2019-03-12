import React from "react";

class Avatar extends React.Component {
    constructor() {
        super();
        this.baseURL = "https://api.github.com/users";
        this.searchContinue = true;
        this.state = {
            isLoaded1: false,
            isLoaded2: false,
            users: [],
            user: {
                "login": "andyliu",
                "name": "Andy Leu",
                "avatar_url": "https://avatars0.githubusercontent.com/u/100?v=4",
                "followers": 21375
            }
        };
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
        this.getFullName = this.getFullName.bind(this);
    }

    componentDidMount() {
        if (!this.state.isLoaded1) {
            fetch(this.baseURL + "?access_token=e1f84fb3f213b5b68c29e9b394e669eb39dc2730")
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
        console.log(this.state.isLoaded1);
    }

    update(e) {
        const searchText = e.target.value;
        console.log(searchText);
        if (this.state.isLoaded1) {
            // this.state.users.map((eachUser, index) => {
            //     if (index < 5) {
            //         const name = eachUser.login;
            //         if (this.searchContinue) {
            //             console.log("index"+index);
            //             this.searchContinue = false;
            //             this.getFullName(name);
            //         }
            //     }
            //     if (this.state.isLoaded2) {
            //         return this.state.user;
            //     } else {
            //         return this.state.defaultUser;
            //     }
            // });
            for (var i = 0; i < this.state.users.length; i++) {
                const eachUser = this.state.users[i];
                // console.log("each user name:"+ this.state.users.length);
                const name = eachUser.login;
                if (this.searchContinue) {
                    console.log("index: " + i + "; name: " + name);
                    this.searchContinue = false;
                    this.getFullName(name);
                }

                console.log("who first:"+ this.searchContinue);
            }
        }
    }

    search(e) {
        this.searchContinue = true;
        this.update(e);
    }

    async getFullName(name) {
        console.log("name:" + name + "; continue: " + this.searchContinue);

        await fetch(this.baseURL + "/" + name + "?access_token=e1f84fb3f213b5b68c29e9b394e669eb39dc2730")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        user: result,
                        isLoaded2: true
                    });
                },
                (error) => ({
                    isLoaded2: false,
                    error
                })
                // .then(()=>{
                //     console.log("name:" + this.state.user.name);

                // })
            )
        console.log("name:" + this.state.user.name);
        if (this.state.user.name.indexOf(name) < 0) {
            this.searchContinue = true;
        }
        console.log("name:" + name + "; continue: " + this.searchContinue);

    }

    render() {
        return (
            <div>
                <input type="search" placeholder="search ..." onChange={this.search}></input>
                <br /><br />
                <img src={this.state.user.avatar_url} height="100" width="100" alt="profile"></img>
                <h1>Github ID: {this.state.user.login}</h1>
                <h1>Full Name: {this.state.user.name}</h1>
                <h1>Followers: {this.state.user.followers}</h1>
            </div>
        );
    };
}

export default Avatar;