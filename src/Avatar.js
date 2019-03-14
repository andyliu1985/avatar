import React from "react";

class Avatar extends React.Component {
    constructor() {
        super();
        this.baseURL = "https://api.github.com/users";
        this.searchContinue = true;
        this.state = {
            isAllUsersLoaded: true,
            isProfileLoaded: true,
            users: [],
            user: {},
            errorMsg: ""
        };
        this.search = this.search.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    componentDidMount() {
        fetch(this.baseURL + "?access_token=e1f84fb3f213b5b68c29e9b394e669eb39dc2730")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isAllUsersLoaded: true,
                        users: result
                    })
                },
                (error) => {
                    this.setState({
                        isAllUsersLoaded: false,
                        errorMsg: "Can not load all users."
                    })

                }
            ).then(() => {
                if (this.state.isAllUsersLoaded) {
                    this.setState({
                        user: this.state.users[0]
                    })
                } else {
                    this.setState({
                        user: {}
                    })
                }
            })
    }

    search(e) {
        this.searchContinue = true;
        let keyWord = e.target.value;
        if (this.state.isAllUsersLoaded) {
            for (var i = 0; i < this.state.users.length; i++) {

                let user = this.state.users[i];
                let loginId = user.login;

                if (this.searchContinue && loginId.indexOf(keyWord) > 0) {
                    this.searchContinue = false;
                    this.getProfile(loginId);
                }
            }

            if (this.searchContinue) {
                this.setState({
                    isProfileLoaded: false,
                    errorMsg: "Can not find this id: " + keyWord
                })
            }
        }
    }

    getProfile(loginId) {
        fetch(this.baseURL + "/" + loginId + "?access_token=e1f84fb3f213b5b68c29e9b394e669eb39dc2730")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isProfileLoaded: true,
                        user: result
                    });
                },
                (error) => {
                    this.setState({
                        isProfileLoaded: false,
                        errorMsg: "Can not load this id: " + loginId
                    })

                }
            )
    }

    render() {
        let divDisplay = 'block';
        let errDisplay = 'none';
        if (this.state.isAllUsersLoaded && this.state.isProfileLoaded) {
            divDisplay = 'block';
            errDisplay = 'none';
        } else {
            divDisplay = 'none';
            errDisplay = 'block';
        }

        const divStyle = {
            display: divDisplay

        }

        const errStyle = {
            display: errDisplay

        }

        return (
            <div>
                <input type="search" placeholder="search profile by github id ..." onChange={this.search}></input>
                <br /><br />
                <div style={divStyle}>
                    <img src={this.state.user.avatar_url} height="100" width="100" alt="profile"></img>
                    <h1>Github ID: {this.state.user.login}</h1>
                    <h1>Full Name: {this.state.user.name}</h1>
                    <h1>Followers: {this.state.user.followers}</h1>
                </div>
                <div style={errStyle}>
                    <h1>Error: {this.state.errorMsg}</h1>
                </div>

            </div>
        );
    };
}

export default Avatar;