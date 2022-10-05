import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useEffect, useState } from 'react';

export default function Indicators() {

    const [selectedIndicator, setselectedIndicator] = useState({});
    const [modal, setModal] = useState(false);
    const [indicators, setIndicators] = useState([]);
    const [publications, setPublications] = useState([]);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        fetch(
            "https://api-cepalstat.cepal.org/cepalstat/api/v1/thematic-tree?lang=es&format=json&area_id=2427"
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.body.children[0].children);
                setIndicators(data.body.children[0].children);
            });
    }, []);


    const showModal = (indicator) => {
        setModal(!modal);
        setselectedIndicator(indicator);
        fetch(
            "https://api-cepalstat.cepal.org/cepalstat/api/v1/indicator/" + indicator.indicator_id + "/publications?lang=es&app=portal"
        )
            .then((response) => response.json())
            .then((data) => {
                setPublications(data.body.publications);
            });

    };


    return (<div>
        <h1> Indicators </h1>
        <div className="row">  {

            indicators.map((indicator) =>

                < div className="col-md-4" >

                    <div
                        className='borde-imagen-claro'
                        onClick={() => { showModal(indicator) }}
                    > <p
                        className='manito'
                    > [{indicator.indicator_id}] {indicator.name}</p></div>


                </div>

            )
        }
        </div>

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}> [{selectedIndicator.indicator_id}] {selectedIndicator.name} </ModalHeader>
            <ModalBody>

                <div className="row">  {

                    publications.map((pub) =>

                        < div className="col-md-4" >

                            <div className='borde-imagen-claro' >

                                <img src={pub.thumbnail}
                                    height='150px'
                                    width='100px'
                                />

                                <div> {pub.title} </div>

                            </div>

                        </div>

                    )
                }
                </div>

            </ModalBody>
            <ModalFooter >
                <Button color="secondary" onClick={toggle}>Cerrar</Button>
            </ModalFooter>
        </Modal>

    </div>
    );
};