import React, {useEffect, useState} from 'react';
import { Row, Col, Button } from 'reactstrap';
import {RouteComponentProps, Link, Redirect} from 'react-router-dom';
import {fetchWithAuth} from '../services/fetch';
import ReactHtmlParser from 'react-html-parser';
import Loading from "../components/Loading";
import {Submissions} from '../types';
import Editor from "../components/Editor";

interface ProblemInterface {
  content: string,
  created: string,
  id: number | null,
  pack: number | null,
  title: string
}


const Problem: any = (props:RouteComponentProps<any>) => {



  const [code, setCode] = useState<string>('');
  const [problem,setProblem] = useState< Submissions>();

  useEffect(() => {
    fetchWithAuth(`main/problems/${props.match.params.id}`,{headers: {'Accept': 'application/json'}})
        .then(res => res.json())
        .then(json => setProblem(json))
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
                    {ReactHtmlParser(problem.problem_title)}
                  </div>
                </div>
              </>
          ) : <div className={"w-100 text-center"}>
            <Loading />
          </div>
          }

        </Col>
        <Col md={6}>
          <p>Type your solution</p>
          <Editor code={code}/>
        </Col>
      </Row>
  )
}

export default Problem;
