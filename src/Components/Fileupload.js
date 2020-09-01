import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import S3FileUpload from '../../components/react-s3';

function Fileupload () {
    const config = {
        bucketName: BUCKETNAME,
        dirName: DIRNAME, /* optional */
        region: REGION,
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRECT_ACCESS_KEY,
      };
    const [fileLoc, setFileLoc] = useState('');
    const onHandleFile = (object) => {
        // const previewVisible = 'preview show';
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          const file = object.target.files[0];
          const onHand = async (evt) => {
            await setFileLoc(evt);
          };
          console.log(file);
          S3FileUpload.uploadFile(file, config)
            .then(data => onHand(data.location))
            .catch(err => console.error(err));
        } else {
          // eslint-disable-next-line no-alert
          alert('The File APIs are not fully supported in this browser.');
          console.error('The File APIs are not fully supported in this browser.');
        }
      };
      return (
          <Form>
               <h3 className="mt-4">Terms & Conditions</h3>
              {fileLoc ? (<div className="fileuplodhere d-flex justify-content-center align-items-center">
          <i className="sIcon uplodDoc mr-3" /><span className="m-None" />
          <a href={fileLoc} target="_blank" >Click here to view T&C</a><span onClick={() => setFileLoc('')}>Remove</span>
        </div>)
         :
        (<div className="fileuplodhere d-flex justify-content-center align-items-center">
          <i className="sIcon uplodDoc mr-3" /><span className="m-None">Drag and drop file or </span>  <Form.File
            className="fileupload position-relative"
            type="file"
            name="file"
            label=""
            data-browse="click here"
            id="termsConditions"
            custom
            onChange={onHandleFile}
          /><span>to upload</span>
        </div>) }
          </Form>
      )
}

export default Fileupload;