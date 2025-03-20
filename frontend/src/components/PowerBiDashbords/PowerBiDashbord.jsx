import React from 'react'
import "./PowerBiDashbord.css"

const PowerBiDashboard = () => {

    // const orderToCash = [
    //     {
    //         headerText: "ORDERS",
    //         dataText: "order",
    //         url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi&clientSideAuth=0",
    //     },

    //     {
    //         headerText: "DELIVERY",
    //         dataText: "delivery",
    //         url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0",
    //     },

    //     {
    //         headerText: "BILLING",
    //         dataText: "billing",
    //         url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi&clientSideAuth=0",
    //     }
    // ]
    // const procurement = [
    //     {
    //         headerText: "PO HEADER",
    //         dataText: "purchase",
    //         url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
    //     }
    // ]

    const HANElyticsDashboards = [
        {
            headerText: "Inventory predictions",
            dataText: "inventory",
            url: "https://app.powerbi.com/groups/me/reports/629c6dc2-6b0d-4c68-9e54-c2a47600a03b/df6b1d7bb0643125b744?experience=power-bi&clientSideAuth=0",
        },
        {
            headerText: "Revenue, Clinical and Equipment Failure",
            dataText: "revenue",
            url: "https://app.powerbi.com/groups/me/reports/31dc0bfe-4eec-4dbd-b418-c7e969f7d2f4/3610dece708b751eba90?experience=power-bi&clientSideAuth=0",
        },
        {
            headerText: "NewsPaper_Predictions",
            dataText: "reports",
            url: "https://app.powerbi.com/groups/7235dce4-8159-49bc-ab3f-223406e7937b/reports/cdc28a63-1551-4b0c-8385-1150e1dd46ce/8c4854b8de780c3490e6?experience=power-bi&clientSideAuth=0",
        }
    ]

    return (
        // <MsalProvider instance={msalInstance}>
        <div className="dashboard-container">
            <div>
                < div className="dashboard-container" >
                    <h1 className="dashboard-title">HANElyticsDashboards</h1>
                    <div className="dashboard-section">
                        {HANElyticsDashboards.map((type) => {
                            return (
                                <div key={type.dataText} className="dashboard-card">
                                    <h1 className="card-title">{type.headerText}</h1>
                                    <button className="dashboard-button" onClick={() => login(`${type.dataText}, ${type.url}`)}>
                                        <a href={type.url} target='_blank'>Click to View</a>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div >

            </div >
        </div >
        // </MsalProvider>
    );
}

export default PowerBiDashboard