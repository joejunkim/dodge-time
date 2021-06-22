import './SplashPage.css';

function SplashPage() {
    return (
        <div className='splash-container'>
            <div className='splash-body'>
                <h1>Welcome!</h1>
                <h3>Join groups to meet fellow players, find events to attend, and most importantly, dodge balls!</h3>
            </div>
            <div className='splash-right'>
                <h2>🔴 Dodge</h2>
                <h2>🟢 Duck</h2>
                <h2>🔵 Dip</h2>
                <h2>🟡 Dive</h2>
                <h2>🔴 Dodge</h2>
            </div>
            {/* <div className='splash-right'>
                <h2>🔴</h2>
                <h2>🟢</h2>
                <h2>🔵</h2>
                <h2>🟡</h2>
                <h2>🔴</h2>
            </div> */}
        </div>
    );
}

export default SplashPage;
