// This component renders an example request or response for an API endpoint,
// based on example data provided in that API's Swagger document

/* eslint-disable react/no-multi-comp */

import {hasExampleData, fillPostBodySampleData, buildCurl} from '../../shared/helpers';
import React from 'react';
import PropTypes from 'prop-types';
import ExpanderIcon from './expanderIcon';

const replaceSpaces = (str) => str.replace(/\s/g, '');

const RenderExample = ({example}) => {
    return (
        <pre className='highlight' style={{overflow: 'scroll', height: '400px', marginTop: '10px'}}>
          {example}
        </pre>
    );
};

RenderExample.displayName = 'Render Example';
RenderExample.propTypes = {
    example: PropTypes.string
};

// Transforms an request or response schema into a prettified code snippet.
const formatReqOrResSchema = (schema) => JSON.stringify(fillPostBodySampleData(schema), null, 2);

const showExample = (schema) => schema && hasExampleData('POST_BODY', schema);

const EndpointExamples = ({endpoint}) => {
    return (
      <div className='endpoint-examples-container'>
        <div className='request-container'>
          <div className={'try-it-now-header'} data-target={`#${replaceSpaces(endpoint.operationId)}-console-body-request`} data-toggle={'collapse'} id={`${replaceSpaces(endpoint.operationId)}-console`} onClick={
            () => {
                $(`#${replaceSpaces(endpoint.operationId)}-console-icon-request`).toggleClass('rotate');
                $('.console-tool-tip').tooltip();
            }
                }>
            <div className={'documentation-expand-icon'} id={`${replaceSpaces(endpoint.operationId)}-console-icon-request`} style={{display: 'inline-block', marginRight: '5px'}}>
              <ExpanderIcon startPosition={'DOWN'}/>
            </div>
            <h3 className={'clickable'} style={{display: 'inline-block'}}>{'Example Request'}</h3>
          </div>
          <div className={'collapse'} id={`${replaceSpaces(endpoint.operationId)}-console-body-request`}>
            <code className='highlight-rouge'>
              {`${endpoint.action.toUpperCase()} ${endpoint.path}`}
            </code>
            {showExample(endpoint.requestSchema) ? <RenderExample example={formatReqOrResSchema(endpoint.requestSchema)}/> : null}
          </div>
        </div>
        <div className='response-container'>
          <div className={'try-it-now-header'} data-target={`#${replaceSpaces(endpoint.operationId)}-console-body-response`} data-toggle={'collapse'} id={`${replaceSpaces(endpoint.operationId)}-console`} onClick={
            () => {
                $(`#${replaceSpaces(endpoint.operationId)}-console-icon-response`).toggleClass('rotate');
                $('.console-tool-tip').tooltip();
            }
                }>
            <div className={'documentation-expand-icon'} id={`${replaceSpaces(endpoint.operationId)}-console-icon-response`} style={{display: 'inline-block', marginRight: '5px'}}>
              <ExpanderIcon startPosition={'DOWN'}/>
            </div>
          <h3 className={'clickable'} style={{display: 'inline-block'}}>{'Example Response'}</h3>
          </div>
          <div className={'collapse'} id={`${replaceSpaces(endpoint.operationId)}-console-body-response`}>
          {showExample(endpoint.responseSchema) ? <RenderExample example={formatReqOrResSchema(endpoint.responseSchema)}/> : null}
          </div>
        </div>
        <div className='curl-container'>
          <div className={'try-it-now-header'} data-target={`#${replaceSpaces(endpoint.operationId)}-console-body-curl`} data-toggle={'collapse'} id={`${replaceSpaces(endpoint.operationId)}-console`} onClick={
            () => {
                $(`#${replaceSpaces(endpoint.operationId)}-console-icon-curl`).toggleClass('rotate');
                $('.console-tool-tip').tooltip();
            }
                }>
            <div className={'documentation-expand-icon'} id={`${replaceSpaces(endpoint.operationId)}-console-icon-curl`} style={{display: 'inline-block', marginRight: '5px'}}>
              <ExpanderIcon startPosition={'DOWN'}/>
            </div>
            <h3 className={'clickable'} style={{display: 'inline-block'}}>{'Example Using CURL'}</h3>
          </div>
          <div className={'collapse'} id={`${replaceSpaces(endpoint.operationId)}-console-body-curl`}>
          <RenderExample example={buildCurl(endpoint.sampleAuthHeader, endpoint, true)} />
          </div>
        </div>
      </div>
    );
};

EndpointExamples.propTypes = {
    endpoint: PropTypes.object
};

EndpointExamples.displayName = 'EndpointExamples';
export default EndpointExamples;
