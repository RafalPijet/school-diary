import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Collapse, CardBody, Card} from 'reactstrap';
import ParentItemCollapse from '../ParentItemCollapse/ParentItemCollapseContainer';
import './ParentItem.scss';

const ParentItem = props => {
    const {parent, i, selectedItem, collapseHandling} = props;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(selectedItem === i)
    }, [setIsOpen, selectedItem, i]);

    const collapseSetting = () => {
        setIsOpen(!isOpen);
        collapseHandling(i);
    };

    return (
        <div>
            <div className='parent-item-main' onClick={collapseSetting}>
                <span className='text-center col-1 '>{i + 1}</span>
                <span className='text-left col-2'>{parent.lastName}</span>
                <span className='text-left col-2'>{parent.firstName}</span>
                <span className='text-center col-2'>{parent.birthDate.substring(0, 10)}</span>
                <span className='text-center col-4'><a href={`mailto:${parent.email}`}>{parent.email}</a></span>
                <span className='text-center col-1'>{parent.students.length}</span>
            </div>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody className='parent-collapse'>
                        <ParentItemCollapse parent={parent}/>
                    </CardBody>
                </Card>
            </Collapse>
        </div>

    )
};

ParentItem.propTypes = {
    parent: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    selectedItem: PropTypes.number,
    collapseHandling: PropTypes.func.isRequired
};

export default ParentItem;
