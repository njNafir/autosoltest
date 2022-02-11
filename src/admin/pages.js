import { Component, React, useEffect, useState } from 'react';
import { Card } from "antd";

export default function ManagePages() {

//   const [aboutPageContent, setAboutPageContent] = useState({});
//   const [contactPageContent, setContactPageContent] = useState({});

//   const Iframe = React.createClass({     
//     render: function() {
//       return(         
//         <div>          
//           <iframe src={this.props.src} height={this.props.height} width={this.props.width}/>         
//         </div>
//       )
//     }
//   });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/blog/pages/about/", {
//         method: "GET"
//     })
//         .then((res) => res.json())
//         .then((about_page_content) => {
//             console.log(about_page_content)
//             setAboutPageContent(about_page_content)
//         })

//     fetch("http://127.0.0.1:8000/api/blog/pages/contact/", {
//         method: "GET"
//     })
//         .then((res) => res.json())
//         .then((contact_page_content) => {
//             console.log(contact_page_content)
//             setContactPageContent(contact_page_content)
//         })

//   }, []);

  return (
    <div>
        <Card
            hoverable
            style={{ width: 240 }}
            // cover={<Iframe src="http://plnkr.co/" height="500" width="240"/>}
        >
            <Card.Meta title="About page" description="localhost:3000/about/" />
        </Card>

        <Card
            hoverable
            style={{ width: 240 }}
            // cover={<Iframe src="http://plnkr.co/" height="500" width="240"/>}
        >
            <Card.Meta title="Contact page" description="localhost:3000/contact/" />
        </Card>
    </div>
  );
}
