import React, {useEffect, useState,useContext} from 'react';
import { Row, Col, Button,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {RouteComponentProps, Link, Redirect} from 'react-router-dom';
import {fetchWithAuth} from '../services/fetch';
import ReactHtmlParser from 'react-html-parser';
import Loading from "../components/Loading";
import Editor from "../components/Editor";
import MainContext from "../services/MainContext";
import {useTranslation} from "react-i18next";


interface ProblemInterface {
  content: string,
  created: string,
  id: number | null,
  pack: number | null,
  title: string,
  default_body: string
}


const Problem: any = (props:RouteComponentProps<any>) => {


  const Context = useContext(MainContext);
  const [code, setCode] = useState<string>('');
  const [currentLanguage,setCurrentLanguage] = useState<string>("javascript")
  const [redirect,setRedirect] = useState<boolean>(false);
  const [err,setError] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(false);
  const [problem,setProblem] = useState<ProblemInterface>({
    content: '',
    created: '',
    id: null,
    pack: null,
    title: '',
    default_body: "",
  });

  const onChange = (newValue: string): void => {
    setCode(newValue);
  }

  const {t} = useTranslation();

  useEffect(() => {
    fetchWithAuth(`main/problems/${props.match.params.id}`,{headers: {'Accept': 'application/json'}})
        .then(res => {
          if(res.status === 403) {
            setError(true);
          }
          return res.json()
        })
        .then(json => {
          Context.setTitle(t('table.problem') + " " + json.title);
          setCode(json.default_body);
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
    formData.append('language', currentLanguage === 'javascript' ? 'JS' : 'PY')
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
          <p>{t('problem.description')}</p>
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
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">{t('problem.type')}</p>
            <UncontrolledDropdown>
              <DropdownToggle caret className="text-capitalize">
                {currentLanguage}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => setCurrentLanguage("python")} className="text-capitalize">Python</DropdownItem>
                <DropdownItem onClick={() => setCurrentLanguage("javascript")} className="text-capitalize">JavaScript</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <Editor code={code} lang={currentLanguage} onChange={onChange}/>
          {localStorage.getItem("cutie-py-token") ? (
              <div className="w-100 d-flex justify-content-around align-items-center mt-3">
                <Button className="rounded pl-5 pr-5" color="success" onClick={sendContent}>{t('problem.submit')}</Button>
                {t('problem.or')}
                <Button className="rounded mr-3 pl-4 pr-4 text-light" onClick={handleClick}>
                  {t('problem.choose-file')}
                  <input type="file"
                         id={"hidden-file-input"}
                         onChange={handleChange}
                         accept={currentLanguage === 'python' ? ".py" : ".js"}
                         style={{display: 'none'}}/>
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
