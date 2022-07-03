function Login({user,setUser,postLogin}) {
    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            id_card_number: e.target.id_card_number.value,
            password: e.target.password.value
        }
        postLogin(data)
    }
    return(
        <main>
            <header className="jumbotron">
                <div className="container text-center">
                    <h1 className="display-4">Vaccination Platform</h1>
                </div>
            </header>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card card-default" onSubmit={handleSubmit}>
                            <div className="card-header">
                                <h4 className="mb-0">Login</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">ID Card Number</div>
                                    <div className="col-8">
                                        <input type="text" className="form-control" name="id_card_number" required/>
                                    </div>
                                </div>
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">Password</div>
                                    <div className="col-8">
                                        <input type="password" className="form-control" name="password" required/>
                                    </div>
                                </div>
                                <div className="form-group row align-items-center mt-4">
                                    <div className="col-4"></div>
                                    <div className="col-8">
                                        <button className="btn btn-primary" type="submit">Login</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Login