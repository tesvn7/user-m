'use client'

import {useState} from'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import AllUsers from './AllUsers';

const AccordionUi = () => {
    const [open, setOpen] = useState(1);
    
    const handleOpen = (value) => setOpen(open == value ? 0 : value)
    
    return (
        <section className='w-[40rem]'>
            <Accordion open={open == 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                    All Users
                </AccordionHeader>
                <AccordionBody> 
                    <AllUsers />
                </AccordionBody>

                <AccordionHeader onClick={() => handleOpen(1)}>
                    Search For Specific User
                </AccordionHeader>
                <AccordionBody> 
                    
                </AccordionBody>

            </Accordion>

        </section>
    );
};

export default AccordionUi;