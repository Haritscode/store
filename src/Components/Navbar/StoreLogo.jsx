import '../../scss/StoreLogo.scss'
export default function StoreLogo({storeName="Custom Store is Best"}) {    
    return (
        <div className="logo-container">
            <ul className='logo_container_ul'>
                <li className='logo_containe_ul_li'>
                    <div className="logo-holder">
                            <h3 className='store_name'>{storeName?.split(" ").length===1?storeName?.split(" ")[0]:storeName?.split(" ").length>2?storeName?.split(" ")[0]+" "+storeName?.split(" ")[1]+" "+storeName.split(" ")[2]:storeName?.split(" ")[0]+" "+storeName?.split(" ")[1]}</h3>
                            <p className='powered_by_beazy'>Powered by Beazy</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}
