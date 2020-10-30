import React from 'react';

function Info(){
    return (
        <div className="container cp">
            <h3 className="cphead"><center>Open Source Development</center></h3>
            <div className="row cpguide">
                <div className="col-md-4 col-12">
                    <img src="/assets/images/os/1.jpg" alt="os pic" className="cpp2"/>
                </div>
                <div className="col-md-8 col-12">
                    <p>
                    A software for which the original source code is made freely available and may be redistributed
                     and modified according to the requirement of the user. Open source software is that by which 
                     the source code or the base code is usually available for modification or enhancement by 
                     anyone for reusability and accessibility. Open source code is the part of software that mostly
                      users don't ever see. Anyone can manipulate and change a piece of software so that the program 
                      or application can work. Programmers who have access to a computer program source code can improve 
                      a program by adding features to it or fixing parts that don't always work correctly.
                    </p>
                </div>
            </div>

            
            <h4><center>What is Open Souce Software?</center></h4>

            <div className="row cpguide">
                <div className="col-md-8 col-12">
                    <p>
                    Open source software is software with source code that anyone can inspect, modify, and enhance.
                    "Source code" is the part of software that most computer users don't ever see; it's the code 
                    computer programmers can manipulate to change how a piece of software—a "program" or 
                    "application"—works. Programmers who have access to a computer program's source code can improve 
                    that program by adding features to it or fixing parts that don't always work correctly.
                    </p>
                </div>
                <div className="col-md-4 col-12">
                    <img src="/assets/images/os/2.jpg" alt="os pic" className="cpp2"/>
                </div> 
            </div>

            <h4><center>Why do people prefer using open source software?</center></h4>
            <div className="row cpguide">
                <div className="col-md-3 col-12">
                    <div className="row m-0">
                        <div className="col-md-12 col-6">
                            <img src="/assets/images/os/3.jpg" alt="os pic" className="cpp2"/>
                        </div>
                        <div className="col-md-12 col-6">
                        <img src="/assets/images/os/4.jpg" alt="os pic" className="cpp2"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-12">
                    <p>
                    <b>Control</b> : Many people prefer open source software because they have more control over that kind
                     of software. They can examine the code to make sure it's not doing anything they don't want 
                     it to do, and they can change parts of it they don't like. Users who aren't programmers also 
                     benefit from open source software, because they can use this software for any purpose they wish—not 
                     merely the way someone else thinks they should.
                    </p>
                    <p>
                    <b>Training</b> : Other people like open source software because it helps them become better programmers. Because 
                    open source code is publicly accessible, students can easily study it as they learn to make better software. 
                    Students can also share their work with others, inviting comment and critique, as they develop their skills. 
                    When people discover mistakes in programs' source code, they can share those mistakes with others to help 
                    them avoid making those same mistakes themselves.
                    </p>
                    <p>
                    <b>Security</b> : Some people prefer open source software because they consider it more secure and stable than proprietary 
                    software. Because anyone can view and modify open source software, someone might spot and correct errors or omissions 
                    that a program's original authors might have missed. And because so many programmers can work on a piece of open source 
                    software without asking for permission from original authors, they can fix, update, and upgrade open source software more 
                    quickly than they can proprietary software.                
                    </p>
                    <p>
                    <b>Stability</b> : Many users prefer open source software to proprietary software for important, long-term projects. 
                    Because programmers publicly distribute the source code for open source software, users relying on that software 
                    for critical tasks can be sure their tools won't disappear or fall into disrepair if their original creators stop 
                    working on them. Additionally, open source software tends to both incorporate and operate according to open standards.
                    </p>
                    <p>
                    <b>Community</b> : Open source software often inspires a community of users and developers to form around it. That's not 
                    unique to open source; many popular applications are the subject of meetups and user groups. But in the case of open 
                    source, the community isn't just a fanbase that buys in (emotionally or financially) to an elite user group; it's the 
                    people who produce, test, use, promote, and ultimately affect the software they love.
                    </p>
                </div>
            </div>

            <div className="row cpguide">
                <div className="col-md-4 col-12 offset-md-4">
                    <img src="/assets/images/os/5.png" alt="os pic" className="cpp2"/>
                </div>
            </div>
        </div>
    )
}
export default Info;