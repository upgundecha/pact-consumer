import Player from "../player";
const axios = require('axios');
import adapter from 'axios/lib/adapters/http';

class PlayerService {

    constructor(baseUrl, port) {
        this.baseUrl =  baseUrl;
        this.port = port;
    }

    getPlayer(playerId) {
        if (playerId == null) {
            throw new Error("playerId must not be null!");
        }
        return axios.request({
            method: 'GET',
            url: `/players/${playerId}`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8'
            }
        }, adapter).then((response) => {
            const player = response.data;
            return new Promise((resolve, reject) => {
                try {
                    this._validateIncomingPlayer(player);
                    resolve(player);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };

    createPlayer(player) {
        this._validatePlayerForCreation(player);
        return axios.request({
            method: 'POST',
            url: `/players`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: player
        }, adapter).then((response) => {
            const player = response.data;
            return new Promise((resolve, reject) => {
                try {
                    this._validateIncomingPlayer(player);
                    resolve(player);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };

    _validateIncomingPlayer(player) {
        Player.validateId(player);
        Player.validateName(player);
        Player.validateRole(player);
        Player.validateCountry(player);
    }

    _validatePlayerForCreation(player) {
        delete player.id;
        Player.validateName(player);
        Player.validateRole(player);
        Player.validateCountry(player);
    }
}

export default PlayerService;