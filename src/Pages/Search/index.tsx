import React, { useState } from 'react';
import Navbar from '../../Core/Components/NavBar';
import { makeRequest } from '../../Core/utils/requests';
import ButtonIcon from '../../Core/Components/ButtonIcon/';
import { User } from '../../Core/Types/User';
import ImageLoader from './Components/Loaders/ImageLoader';
import InfoLoader from './Components/Loaders/InfoLoader';
import dayjs from "dayjs";
import './styles.css';

const Search = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isCLiked, setIsCliked] = useState(false);
    const [user, setUser] = useState<User>();
    const [usuario, setUsuario] = useState(user?.name);

    const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsuario(event.target.value);
    }

    function handleOnclick() {
        setIsCliked(true);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsLoading(true);
        makeRequest({ url: `${usuario}` })
            .then((Response: { data: React.SetStateAction<User | undefined>; }) => setUser(Response.data))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const date = dayjs(user?.created_at).format("DD/MM/YYYY");
    return (
        <>
            <Navbar />

            <div className="content-geral">
                <form onSubmit={handleSubmit}>
                    <h1 className="content-title">
                        Encontre um perfil Github
                    </h1>
                    <input
                        type="text"
                        placeholder="Usuario Github"
                        className="form-control"
                        value={usuario}
                        onChange={handleOnchange}
                    />
                    <div className="content-button">
                        <ButtonIcon text='Encontrar' onClick={handleOnclick} />
                    </div>
                </form>
            </div>

            {isCLiked && (
                <div className='info-container'>
                    {isLoading ? (
                        <div className='cont-loader'>
                            <div className='loader-esq'>
                                <ImageLoader />
                            </div>
                            <div className='loader-dir'>
                                <InfoLoader />
                            </div>
                        </div>
                    ) : (
                            <>
                                <div className="coluna1">
                                    <img src={user?.avatar_url} alt='imagem_user' className="container-img"></img>
                                    <div className="button-profile-cont">
                                        <a className="link"
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href={`https://github.com/${usuario}`}
                                        >
                                            <ButtonIcon
                                                text="Ver Perfil" />
                                        </a>
                                    </div>
                                </div>
                                <div className="coluna2">
                                    <div className="linhas-topo">
                                        <h1 className="container-total-repositorios">
                                            Repositórios públicos: {user?.public_repos}
                                        </h1>
                                        <h1 className="container-total-repositorios">
                                            Seguidores: {user?.followers}
                                        </h1>
                                        <h1 className="container-total-repositorios">
                                            Seguindo: {user?.following}
                                        </h1>
                                    </div>

                                    <div className="linhas-bottom">
                                        <h1 className="form-title">
                                            Informações
                                        </h1>
                                        <h1 className="form-info">
                                            <strong>Empresa:</strong> {user?.company}
                                        </h1>
                                        <h1 className="form-info">
                                            <strong>Website/Blog:</strong> {user?.blog}
                                        </h1>
                                        <h1 className="form-info">
                                            <strong>Localidade:</strong> {user?.location}
                                        </h1>
                                        <h1 className="form-info">
                                            <strong>Membro desde:</strong> {date}
                                        </h1>
                                    </div>
                                </div>
                            </>

                        )}
                </div>
            )}  
        </>
    );
};
export default Search;