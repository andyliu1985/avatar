import React from "react";

class Avatar extends React.Component {
    constructor() {
        super();
        this.state = { searchText: "mojombo",
        name: "mojombo",
        followers: 100, 
        isLoaded:false, 
        users: [],
        profileURL: "https://avatars0.githubusercontent.com/u/1?v=4"
     };
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        fetch("https://api.github.com/users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        users: result
                    })
                },
                (error)=>({
                    isLoaded: false,
                    error
                })
            )

            // console.log(this.state.users);

    }

    update(e) {
        console.log(e.target.value);
        console.log(this.state.users);
        this.state.users.map((user, index) =>{
            if(user.login.indexOf(e.target.value > 0)){
                this.setState({name: user.login, profileURL: user.avatar_url});
            }
            return 0;

        });

    }

    render() {
        return (
            <div>
                <input type="search" placeholder="search ..." onChange={this.update}></input>
                <br/><br/>
                <img src={this.state.profileURL} height="100" width="100" alt="profile"></img>

                <h1>Full Name: {this.state.name}</h1>
                <h1>Followers: {this.state.followers}</h1>

            </div>
        );
    };
}


export default Avatar;