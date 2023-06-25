import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Players {
  name: string;
  rushing_yards: number;
  touchdowns_thrown:number;
  sacks: number;
  field_goals: number;
  missed_goals: number;
  catches: number;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  players: any[] = [];
  newPlayer: any = {};
  sortedPlayers: any[] = [];
  maxGoalsPlayer: Players | null = null; // Holds the player with maximum goals
  maxTouchdownThrowsPlayer : Players | null = null; //Holds the player with maximum touchdown_throws
  maxRushingYardsPlayer : Players | null = null; //Holds the player with maximum rushing_yards
  minRushingYardsPlayer : Players | null = null; //Holds the player with minimum rushing_yards
  minGoalsPlayer: Players | null = null; // Holds the player with the least goals
  maxSacksPlayer : Players | null = null; //Holds the player with maximum sacks

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPlayers();
  }

  // Retrieve players data based on the number of goals scored in descending order:
  getPlayers() {
    this.http.get<any[]>('http://localhost:3000/players')
      .subscribe(data => {
        this.players = data;
        //this.players.sort((a, b) => b.field_goals - a.field_goals); 
        this.sortedPlayers = this.sortPlayersByGoals();
        this.calculateMaxGoalsPlayer();
        this.calculateMinGoalsPlayer();
        this.calculateMaxTouchdownThrowsPlayer();
        this.calculateMaxRushingYardsPlayer();
        this.calculateMinRushingYardsPlayer();
        this.calculateMaxSacksPlayer();
      });

  }

  // Add a new player
  addPlayer() {
    if (this.newPlayer._id) {
      // If the newPlayer has an ID, it means we are updating an existing player
      this.updatePlayer();
    } else {
      // Otherwise, we are adding a new player
      this.http.post<any>('http://localhost:3000/players', this.newPlayer)
        .subscribe(data => {
          this.players.push(data);
          this.newPlayer = {};
          //this.players.sort((a, b) => b.field_goals - a.field_goals); 
          this.calculateMaxGoalsPlayer();
          this.calculateMinGoalsPlayer();
          this.calculateMaxTouchdownThrowsPlayer();
          this.calculateMaxRushingYardsPlayer();
          this.calculateMinRushingYardsPlayer();
          this.calculateMaxSacksPlayer();
        });
    }
  }
  

  // Delete a player
  deletePlayer(playerId: string) {
    this.http.delete(`http://localhost:3000/players/${playerId}`)
      .subscribe(() => {
        this.players = this.players.filter(player => player._id !== playerId);
        this.calculateMaxGoalsPlayer();
        this.calculateMinGoalsPlayer();
        this.calculateMaxTouchdownThrowsPlayer();
        this.calculateMaxRushingYardsPlayer();
        this.calculateMinRushingYardsPlayer();
        this.calculateMaxSacksPlayer();
      });
  }

  // Edit a player
  editPlayer(player: any) {
    // Assign the player values to the newPlayer object for editing
    this.newPlayer = {
      _id: player._id,
      name: player.name,
      rushing_yards: player.rushing_yards, 
      touchdowns_thrown:player.touchdowns_thrown, 
      sacks: player.sacks, 
      field_goals: player.field_goals, 
      missed_goals: player.missed_goals, 
      catches: player.catches
    };
  }

  //Update
  updatePlayer() {
    this.http.put<any>(`http://localhost:3000/players/${this.newPlayer._id}`, this.newPlayer)
      .subscribe(data => {
        const index = this.players.findIndex(player => player._id === data._id);
        if (index !== -1) {
          this.players[index] = data;
          this.newPlayer = {}; 
          //this.players.sort((a, b) => b.field_goals - a.field_goals); 
          this.calculateMaxGoalsPlayer();
          this.calculateMinGoalsPlayer();
          this.calculateMaxTouchdownThrowsPlayer();
          this.calculateMaxRushingYardsPlayer();
          this.calculateMinRushingYardsPlayer();
          this.calculateMaxSacksPlayer();
        }
      });
  }

  // Calculate player with maximum goals
  calculateMaxGoalsPlayer() {
    this.maxGoalsPlayer = this.players.reduce((maxPlayer, player) => {
      if (!maxPlayer || player.field_goals > maxPlayer.field_goals) {
        return player;
      }
      return maxPlayer;
    }, null);
  }

  // // Retrieve players data based on the number of goals scored in descending order:
  // getPlayersBasedOnMaxGoals() {
  //   this.http.get<any[]>('http://localhost:3000/players')
  //     .subscribe(data => {
  //       this.players = data;
  //       this.players.sort((a, b) => b.field_goals - a.field_goals); 
  //       this.calculateMaxGoalsPlayer();
  //       this.calculateMinGoalsPlayer();
  //       this.calculateMaxTouchdownThrowsPlayer();
  //       this.calculateMaxRushingYardsPlayer();
  //       this.calculateMinRushingYardsPlayer();
  //       this.calculateMaxSacksPlayer();
  //     });

  // }
  
  // Sort players by goals
  sortPlayersByGoals() {
        return this.players.slice().sort((a, b) => b.field_goals - a.field_goals);
  }

  // Calculate player with the least goals
  calculateMinGoalsPlayer() {
    this.minGoalsPlayer = this.players.reduce((minPlayer, player) => {
      if (!minPlayer || player.field_goals < minPlayer.field_goals) {
        return player;
      }
      return minPlayer;
    }, null);
  }

  // Calculate player with maximum TouchdownThrows
  calculateMaxTouchdownThrowsPlayer() {
    this.maxTouchdownThrowsPlayer = this.players.reduce((maxPlayer, player) => {
      if (!maxPlayer || player.touchdowns_thrown > maxPlayer.touchdowns_thrown) {
        return player;
      }
      return maxPlayer;
    }, null);
  }

  // Calculate player with maximum RushingYards
  calculateMaxRushingYardsPlayer() {
    this.maxRushingYardsPlayer = this.players.reduce((maxPlayer, player) => {
      if (!maxPlayer || player.rushing_yards > maxPlayer.rushing_yards) {
        return player;
      }
      return maxPlayer;
    }, null);
  }

  // Calculate player with the least RushingYards
  calculateMinRushingYardsPlayer() {
    this.minRushingYardsPlayer = this.players.reduce((minPlayer, player) => {
      if (!minPlayer || player.rushing_yards < minPlayer.rushing_yards) {
        return player;
      }
      return minPlayer;
    }, null);
  }

  // Calculate player with maximum Sacks
  calculateMaxSacksPlayer() {
    this.maxSacksPlayer = this.players.reduce((maxPlayer, player) => {
      if (!maxPlayer || player.sacks > maxPlayer.sacks) {
        return player;
      }
      return maxPlayer;
    }, null);
  }

}


