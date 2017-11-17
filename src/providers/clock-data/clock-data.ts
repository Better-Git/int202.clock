
/*
  Generated class for the ClockDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class Alarm {
  time: string;
  status: string;
}

export class ClockDataProvider {
  private date: string;
  private time: string;
  ms = 0; s = 0; m = 0; h = 0;
  ts = 0; tm = 0; th = 0;

  constructor() {
  	let date = new Date().toDateString().split(" ");
  	this.date = date[0].toUpperCase() + ", " +
      date[1].toUpperCase() + " " + date[2];
    console.log('Initiation ClockDataProvider');
  }

  getCountdown() {
    this.ts--;
    switch (true) {
      case this.th > 0 && this.tm < 60 && this.tm >= 10 &&
        this.ts < 60 && this.ts >= 10:
          return (this.th).toString() + ':' + (this.tm).toString() + ':' + 
            (this.ts).toString();
      case this.th > 0 && this.tm < 60 && this.tm >= 10 &&
        this.ts < 10 && this.ts > 0:
          return (this.th).toString() + ':' + (this.tm).toString() + ':0' + 
            (this.ts).toString();
      case this.th > 0 && this.tm < 60 && this.tm >= 10 && this.ts == 0:
        this.ts += 60;
        return (this.th).toString() + ':' + (this.tm--).toString() + ':00';
      case this.th > 0 && this.tm < 10 && this.tm > 0 &&
        this.ts < 60 && this.ts >= 10:
          return (this.th).toString() + ':0' + (this.tm).toString() + ':' + 
            (this.ts).toString();
      case this.th > 0 && this.tm < 10 && this.tm > 0 &&
        this.ts < 10 && this.ts > 0:
          return (this.th).toString() + ':0' + (this.tm).toString() + ':0' + 
            (this.ts).toString();
      case this.th > 0 && this.tm < 10 && this.tm > 0 && this.ts == 0:
        this.ts += 60;
        return (this.th).toString() + ':0' + (this.tm--).toString() + ':00';
      case this.th > 0 && this.tm == 0 && this.ts < 60 && this.ts >= 10:
        return (this.th).toString() + ':00:' + (this.ts).toString();
      case this.th > 0 && this.tm == 0 && this.ts < 10 && this.ts > 0:
        return (this.th).toString() + ':00:0' + (this.ts).toString();
      case this.th > 0 && this.tm == 0 && this.ts == 0:
        this.ts += 60;
        this.tm += 59;
        return (this.th--).toString() + ':00:00';
      case this.tm > 0 && this.ts < 60 && this.ts >= 10:
        return (this.tm).toString() + ':' + (this.ts).toString();
      case this.tm > 0 && this.ts < 10 && this.ts > 0:
        return (this.tm).toString() + ':0' + (this.ts).toString();
      case this.tm > 0 && this.ts == 0:
        this.ts += 60;
        return (this.tm--).toString() + ':00';
      case this.ts < 60 && this.ts > 0:
        return (this.ts).toString();
      case this.th == 0 && this.tm == 0 && this.ts <= 0:
        return 'DONE';
    }
  }

  getDate() {
    return this.date;
  }

  getMilliseconds() {
    // if (this.ms >= 100) {
    //   this.ms = 0;
    //   this.s++;
    // }
    // if (this.ms < 10) {
    //   return '0' + (this.ms++).toString();
    // } else {
    //   return (this.ms++).toString();
    // }

    switch (true) {
      case this.ms >= 100:
        this.ms = 0;
        this.s++;
        break;
      case this.ms >= 10 && this.ms < 100:
        return (this.ms++).toString();
      case this.ms < 10:
        return '0' + (this.ms++).toString();
    }
  }

  getSeconds() {
    // if (this.s >= 60) {
    //   this.s = 0;
    //   this.m++;
    // }
    // if (this.m >= 60) {
    //   this.m = 0;
    //   this.h++;
    // }
    // if (this.h > 0) {
    //   if (this.m < 10) {
    //     if (this.s < 10) {
    //       return (this.h).toString() + ':0' + (this.m).toString() + ':0' +
    //         (this.s).toString();
    //     }
    //     return (this.h).toString() + ':0' + (this.m).toString() + ':' +
    //       (this.s).toString();
    //   } else {
    //     if (this.s < 10) {
    //       return (this.h).toString() + ':' + (this.m).toString() + ':0' +
    //         (this.s).toString();
    //     }
    //     return (this.h).toString() + ':' + (this.m).toString() + ':' +
    //       (this.s).toString();
    //   }
    // }
    // if (this.m > 0) {
    //   if (this.s < 10) {
    //     return (this.m).toString() + ':0' + (this.s).toString();
    //   }
    //   return (this.m).toString() + ':' + (this.s).toString();
    // }
    // if (this.s >= 0) {
    //   return (this.s).toString();
    // }

    switch (true) {
      case this.h > 0 && this.m >= 10 && this.s >= 10:
        return (this.h).toString() + ':' + (this.m).toString() + ':' +
          (this.s).toString();
      case this.h > 0 && this.m >= 10 && this.s < 10:
        return (this.h).toString() + ':' + (this.m).toString() + ':0' +
            (this.s).toString();
      case this.h > 0 && this.m < 10 && this.s >= 10:
        return (this.h).toString() + ':0' + (this.m).toString() + ':' +
          (this.s).toString();
      case this.h > 0 && this.m < 10 && this.s < 10:
        return (this.h).toString() + ':0' + (this.m).toString() + ':0' +
            (this.s).toString();
      case this.m >= 60:
        this.m = 0;
        this.h++;
        break;
      case this.m > 0 && this.s < 10:
        return (this.m).toString() + ':0' + (this.s).toString();
      case this.m > 0:
        return (this.m).toString() + ':' + (this.s).toString();
      case this.s >= 60:
        this.s = 0;
        this.m++;
        break;
      case this.s >= 0:
        return (this.s).toString();
    }
  }

  getTime() {
    return this.time = new Date().toTimeString().split(" ")[0];
  }

  getTS() {
    return this.ts;
  }

  reset() {
    this.ms = 0;
    this.s = 0;
    this.m = 0;
    this.h = 0;
  }

  resetCountDown(hours, minutes, seconds) {
    let hn = parseInt(hours);
    let mn = parseInt(minutes);
    let sn = parseInt(seconds);
    let h = hn.toString();
    let m = mn.toString();
    let s = sn.toString();
    var hl = (h.length > 0) && (hn != 0);
    var ml = (m.length > 1) && (mn != 0);
    var mm = (m.length > 0) && (mn != 0);
    var sl = (s.length > 1) && (sn != 0);
    var sm = (s.length > 0) && (sn != 0);

    switch (true) {
      case hl && ml && sl:
        return h.toString() + ':' + m + ':' + s;
      case hl && ml && !sl:
        return h.toString() + ':' + m + ':0' + s;
      case hl && !ml && sl:
        return h + ':0' + m.toString() + ':' + s;
      case hl && !ml && !sl:
        return h + ':0' + m + ':0' + s;
      case !hl && mm && sl:
        return m + ':' + s;
      case !hl && mm && !sl:
        return m + ':0' + s;
      case !hl && !ml && sm:
        return s;
    }
  }

  setCountdown(hours, minutes, seconds) {
    this.ts = parseInt(seconds) + 1;
    this.tm = parseInt(minutes);
    this.th = parseInt(hours);

    if (this.ts >= 60) {
      this.tm++;
      this.ts %= 60;
    }
    if (this.tm >= 60) {
      this.th++;
      this.tm %= 60;
    }
  }

}
