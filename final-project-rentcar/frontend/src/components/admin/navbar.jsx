import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarAdmin = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary" style={{ justifyContent: 'center' }}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboardAdmin">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span className="ml-1">Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="nav-item ">
                        <a className="nav-link " href="/mobil" id="masterMobilDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-fw fa-columns"></i>
                            <span className="ml-1">Master Mobil</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="masterMobilDropdown">
                            <NavLink className="dropdown-item" to="/merk">Data Merk</NavLink>
                            <NavLink className="dropdown-item" to="/mobil">Data Mobil</NavLink>
                        </div>
                    </li>

                    <li className="nav-item ">
                        <a className="nav-link " href="#/pesanan" id="masterPemesanDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-fw fa-user"></i>
                            <span className="ml-1">Master Pemesan</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="masterPemesanDropdown">
                            <NavLink className="dropdown-item" to="/pemesan">Data Pemesan</NavLink>
                            <NavLink className="dropdown-item" to="/jenis_bayar">Data Jenis Bayar</NavLink>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/akunUser" id="masterPesananDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-fw fa-receipt"></i>
                            <span className="ml-1">manjemen akun pengguna</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="masterPesananDropdown">
                            <NavLink className="dropdown-item" to="/perjalanan">Data Perjalanan</NavLink>
                            <NavLink className="dropdown-item" to="/pesanan">Data Pesanan</NavLink>
                        </div>
                    </li>

                    {/* <li className="nav-item">
                        <NavLink className="nav-link" to="/akun">
                            <i className="fas fa-fw fa-cog"></i>
                            <span className="ml-1">Manajemen Akun</span>
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
}

export default NavbarAdmin;
