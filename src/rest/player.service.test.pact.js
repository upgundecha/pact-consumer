import PlayerService from './player.service';
import * as Pact from '@pact-foundation/pact';
import Player from '../player';

describe('PlayerService API', () => {

    const playerService = new PlayerService('http://localhost', global.port);

    // a matcher for the content type "application/json" in UTF8 charset
    // that ignores the spaces between the ";2 and "charset"
    const contentTypeJsonMatcher = Pact.Matchers.term({
        matcher: "application\\/json; *charset=utf-8",
        generate: "application/json; charset=utf-8"
    });

    describe('getPlayer()', () => {

        beforeEach((done) => {
            global.provider.addInteraction({
                state: 'a player exists',
                uponReceiving: 'a GET request for a player',
                withRequest: {
                    method: 'GET',
                    path: '/players/30',
                    headers: {
                        'Accept': contentTypeJsonMatcher
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': contentTypeJsonMatcher
                    },
                    body: Pact.Matchers.somethingLike(new Player('Sachin Tendulkar', 'Batsman', 'IN', 30))
                }
            }).then(() => done());
        });

        it('sends a request according to contract', (done) => {
            playerService.getPlayer(30)
                .then(player => {
                    expect(player.name).toEqual('Sachin Tendulkar');
                })
                .then(() => {
                    global.provider.verify()
                        .then(() => done(), error => {
                            done.fail(error)
                        })
                });
        });

    });

    describe('createPlayer()', () => {

        beforeEach((done) => {
            global.provider.addInteraction({
                state: 'provider allows player creation',
                uponReceiving: 'a POST request to create a player',
                withRequest: {
                    method: 'POST',
                    path: '/players',
                    headers: {
                        'Accept': contentTypeJsonMatcher,
                        'Content-Type': contentTypeJsonMatcher
                    },
                    body: new Player('Sachin Tendulkar', 'Batsman', 'IN')
                },
                willRespondWith: {
                    status: 201,
                    headers: {
                        'Content-Type': Pact.Matchers.term({
                            matcher: "application\\/json; *charset=utf-8",
                            generate: "application/json; charset=utf-8"
                        })
                    },
                    body: Pact.Matchers.somethingLike(
                        new Player('Sachin Tendulkar', 'Batsman', 'IN', 30))
                }
            }).then(() => done());
        });

        it('sends a request according to contract', (done) => {
            playerService.createPlayer(new Player('Sachin Tendulkar', 'Batsman', 'IN'))
                .then(player => {
                    expect(player.id).toEqual(30);
                })
                .then(() => {
                    global.provider.verify()
                        .then(() => done(), error => {
                            done.fail(error)
                        })
                });
        });
    });

});