import React, {useEffect, useState,useContext} from 'react';
import { Row, Col } from 'reactstrap';
import {RouteComponentProps} from 'react-router-dom';
import {fetchWithAuth} from '../services/fetch';
import ReactHtmlParser from 'react-html-parser';
import Loading from "../components/Loading";
import {Submissions} from '../types';
import Editor from "../components/Editor";
import MainContext from "../services/MainContext";

const Solution: any = (props:RouteComponentProps<any>) => {

  const [problem,setProblem] = useState< Submissions>();
  const Context = useContext(MainContext);

  useEffect(() => {
    fetchWithAuth(`main/files/?number=${props.match.params.id}`,{headers: {'Accept': 'application/json'}})
        .then(res => res.json())
        .then(json => {
          Context.setTitle("Submission " + json[0].number);
          setProblem(json[0])
        })
        .catch(e => console.error(e))
  },[props.match.params.id])

  return (
      <Row className="problem">
        <Col md={6}>
          <p>Description</p>
          {problem?.problem_title ? (
              <>
                <div className="w-100 bg-white p-3 shadow rounded">
                  <p className="mb-2 problem__title">{problem.problem_title}</p>
                  <div className="text-muted">
                    {ReactHtmlParser(problem.problem_content)}
                  </div>
                </div>
                <p className="mt-4">Status: {problem.status}</p>
              </>
          ) : <div className={"w-100 text-center"}>
                <Loading />
              </div>
          }

        </Col>
        <Col md={6}>
          <p>
            {problem?.username && `${problem.username}'s solution"`}
          </p>
          <Editor code={problem?.content ? problem.content : "#Wait a second"}/>
        </Col>
      </Row>
  )
}

export default Solution;
