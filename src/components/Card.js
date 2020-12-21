import React from 'react'
import { Icon } from 'semantic-ui-react'

const Card = ({ id, name, category, description, due, status, onCheck, onDelete, refProp, dragProps, dragHandleProps }) => {

    const statusStyle = () => {
        if (status === "INCOMPLETE") {
            return 'rgba(255, 166, 0, 0.411)'
        } else {
            return '#21ba4563'
        };
    };

    return (
        <li className="list-item" ref={refProp} {...dragProps} {...dragHandleProps}>
            <div className="ui raised link card">
                    <div className="card-buttons">
                        
                        <button onClick={()=> onDelete(id)} className="ui button delete"><Icon fitted name="delete"></Icon></button>
                        <button onClick={() => onCheck(id)} className="ui button check"><Icon fitted name="checkmark"></Icon></button>
                    </div>
                
                    <div className="content">
                        <div className="header">
                            {name}
                        </div>
                        <div className="meta">
                            <span className="category">
                            {category} 
                            </span>
                        </div>
                        <div className="description">
                            <p>
                            Description: {description} 
                            </p>
                        </div>
                        <br />
                        <div className="extra content">
                            <div className="due">
                                Due Date: {due}
                            </div>
                            <div className="status" style={{background:`${statusStyle()}`}}>
                                Status: {status}
                            </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Card