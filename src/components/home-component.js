import React from 'react';

function Home(){
    return (
        <div>
            <div className="crow">
                <img src="/assets/images/logo.png" alt="Logo" width="30%"/>
            </div>
            <div className="align-c">
                <h3 className="home">A Platform to Guide and Help you in your Technical Journey</h3>
            </div>
            <div className="hinfo">
                <div className="row hrow align-c">
                    <div className="col-12 col-md-6">
                        <img src="/assets/images/home/1.png" alt="Task Image" className="homeimg"/>
                    </div>
                    <div className="col-12 col-md-6 data">
                    Manage all your daily tasks and To Do's with ease
                    </div>
                </div>
                <div className="row hrow align-c">
                    <div className="col-12 col-md-6 order-md-last">
                        <img src="/assets/images/home/5.png" alt="Task Image" className="homeimg"/>
                    </div>
                    <div className="col-12 col-md-6 order-md-first  data">
                        Get inspired from journey of others and share your own experiences and journey
                    </div>
                </div>
                <div className="row hrow align-c">
                    <div className="col-12 col-md-6">
                        <img src="/assets/images/home/2.png" alt="Task Image" className="homeimg"/>
                    </div>
                    <div className="col-12 col-md-6  data">
                    Get the latest technical updates and info about trendy topics in the IT sector
                    </div>
                </div>
                <div className="row hrow align-c">
                    <div className="col-12 col-md-6 order-md-last">
                        <img src="/assets/images/home/6.png" alt="Task Image" className="homeimg"/>
                    </div>
                    <div className="col-12 col-md-6 order-md-first data">
                        Learn basic concepts of open source development.List your projects for getting support and contribute in projects of others
                    </div>
                </div>
                <div className="row hrow align-c">
                    <div className="col-12 col-md-6">
                        <img src="/assets/images/home/4.png" alt="Task Image" className="homeimg"/>
                    </div>
                    <div className="col-12 col-md-6 data">
                    Be a champ at coding competitions.Get updates of all the present and upcoming 
                    coding competitions that are being held on different platforms
                    </div>
                </div>
                <div className="row hrow align-c">
                    <div className="col-12 col-md-6 order-md-last">
                        <img src="/assets/images/home/3.png" alt="Task Image" className="homeimg"/>
                    </div>
                    <div className="col-12 col-md-6 order-md-first data">
                        Get community support for solving your doubts and moving ahead in software development journey
                    </div>
                </div>
                <div className="row hrow align-c">
                    <div className="col-12 col-md-6">
                        <img src="/assets/images/home/7.png" alt="Task Image" className="homeimg"/>
                    </div>
                    <div className="col-12 col-md-6 data">
                        Make schedules and plans for upcoming exams and competitions to increase efficieny and for proper time utilization
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;