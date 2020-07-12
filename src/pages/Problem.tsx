import React, {useEffect, useState,useContext} from 'react';
import { Row, Col, Button } from 'reactstrap';
import {RouteComponentProps, Link, Redirect} from 'react-router-dom';
import {fetchWithAuth} from '../services/fetch';
import ReactHtmlParser from 'react-html-parser';
import Loading from "../components/Loading";
import Editor from "../components/Editor";
import MainContext from "../services/MainContext";



interface ProblemInterface {
  content: string,
  created: string,
  id: number | null,
  pack: number | null,
  title: string
}


const Problem: any = (props:RouteComponentProps<any>) => {


  const Context = useContext(MainContext);
  const [code, setCode] = useState<string>('');
  const [redirect,setRedirect] = useState<boolean>(false);
  const [err,setError] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(false);
  const [problem,setProblem] = useState<ProblemInterface>({
    content: '',
    created: '',
    id: null,
    pack: null,
    title: ''
  });

  const onChange = (newValue: string): void => {
    setCode(newValue);
  }

  useEffect(() => {
    fetchWithAuth(`main/problems/${props.match.params.id}`,{headers: {'Accept': 'application/json'}})
        .then(res => {
          if(res.status === 403) {
            setError(true);
          }
          return res.json()
        })
        .then(json => {
          Context.setTitle('Problem ' + json.title);
          setProblem(json)
        })
        .catch(e => console.error(e))
  },[props.match.params.id])

  const handleClick = ():void => {
    const input: HTMLElement | null = document.getElementById('hidden-file-input');
    input?.click();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setLoading(true);
    const formData = new FormData();
    // @ts-ignore
    formData.append('datafile', event.target.files[0]);
    formData.append('problem', props.match.params.id);

    fetchWithAuth('main/files/upload/',{
      method: 'POST',
      body: formData
    }).then(res => res.json())
        .then(() => setRedirect(!redirect))
        .catch(e => console.error(e))
  }

  const sendContent = ():void => {
    setLoading(true);
    const formData = new FormData();
    formData.append("problem", props.match.params.id);
    formData.append('content',code);
    fetchWithAuth('main/files/upload/',{
      method: 'POST',
      body: formData
    }).then(res => res.json())
        .then(() => setRedirect(!redirect))
        .catch(e => console.error(e))
  }

  if(redirect) return <Redirect to={'/files'} />
  if(err) return <p className="h2 text-center">You don't have permission</p>

  return (
      <Row className="problem">
        <Col md={6}>
          <p>Description</p>
          {problem.title ? (
              <>
                <div className="w-100 bg-white p-3 shadow rounded">
                  <p className="mb-2 problem__title">{problem.title}</p>
                  <div className="text-muted">
                    {ReactHtmlParser(problem.content)}
                  </div>
                </div>
              </>
          ) : <div className={"w-100 text-center"}>
                <Loading />
              </div>
          }

        </Col>
        <Col md={6} className="position-relative">
          {loading && <div
            className="position-absolute w-100 h-100 bg-white d-flex justify-content-center align-items-center"
            style={{top: 0,zIndex: 1000}}>
            <Loading />
          </div>}
          <div className="position-sticky" style={{top: '20px'}}>
          <p>Type your solution</p>
          <Editor code={code} onChange={onChange}/>
          {localStorage.getItem("cutie-py-token") ? (
              <div className="w-100 d-flex justify-content-around align-items-center mt-3">
                <Button className="rounded pl-5 pr-5" color="success" onClick={sendContent}>Submit</Button>
                or
                <Button className="rounded mr-3 pl-4 pr-4 text-light" onClick={handleClick}>
                  Choose a file
                  <input type="file" id={"hidden-file-input"} onChange={handleChange} accept={".py"} style={{display: 'none'}}/>
                </Button>
              </div>
          ) : (<div className="w-100 d-flex justify-content-around align-items-center mt-3">
            <p className={"mb-0"}>You are not authorized!</p>
            <Link to={'/'}>
              <Button>
                Sign in
              </Button>
            </Link>
          </div>)}
          </div>
        </Col>
      </Row>
  )
}

export default Problem;
