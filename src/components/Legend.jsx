/* eslint-disable react/prop-types */

const Legend = ({ statusColors }) => {
    return (
        <div style={legendStyle}>
            <h3>Legend</h3>
            <ul style={listStyle}>
                {Object.entries(statusColors).map(([status, color]) => (
                    <li key={status} style={listItemStyle}>
                        <span
                            style={{
                                display: 'inline-block',
                                width: 20,
                                height: 20,
                                backgroundColor: color,
                                marginRight: 10,
                            }}
                        ></span>
                        {status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Legend.defaultProps = {
    statusColors: {
        Active: 'green',
        Inactive: 'red',
        Pending: 'yellow',
    },
};

const legendStyle = {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    bottom: '0px'
};

const listStyle = {
    listStyleType: 'none',
    paddingLeft: 0,
    margin: 0,
};

const listItemStyle = {
    marginBottom: '5px',
};

export default Legend;