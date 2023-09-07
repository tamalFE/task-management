const LogInPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login </h2>
          <form>
            <div className="form-control w-full max-w-xs my-2">
              <label className="label">
                <span className="label-text">Enter your username</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter Password</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </form>
          <div className="card-actions justify-end mt-2">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
