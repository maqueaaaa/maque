"use strict";
(()=>{
    var ve = Object.create;
    var R = Object.defineProperty;
    var be = Object.getOwnPropertyDescriptor;
    var Ce = Object.getOwnPropertyNames;
    var xe = Object.getPrototypeOf
      , we = Object.prototype.hasOwnProperty;
    var P = (e,t)=>()=>(t || e((t = {
        exports: {}
    }).exports, t),
    t.exports);
    var Le = (e,t,n,r)=>{
        if (t && typeof t == "object" || typeof t == "function")
            for (let o of Ce(t))
                !we.call(e, o) && o !== n && R(e, o, {
                    get: ()=>t[o],
                    enumerable: !(r = be(t, o)) || r.enumerable
                });
        return e
    }
    ;
    var D = (e,t,n)=>(n = e != null ? ve(xe(e)) : {},
    Le(t || !e || !e.__esModule ? R(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e));
    var V = P((Ye,M)=>{
        "use strict";
        var b = typeof Reflect == "object" ? Reflect : null, W = b && typeof b.apply == "function" ? b.apply : function(t, n, r) {
            return Function.prototype.apply.call(t, n, r)
        }
        , w;
        b && typeof b.ownKeys == "function" ? w = b.ownKeys : Object.getOwnPropertySymbols ? w = function(t) {
            return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
        }
        : w = function(t) {
            return Object.getOwnPropertyNames(t)
        }
        ;
        function Ee(e) {
            console && console.warn && console.warn(e)
        }
        var F = Number.isNaN || function(t) {
            return t !== t
        }
        ;
        function l() {
            l.init.call(this)
        }
        M.exports = l;
        M.exports.once = Se;
        l.EventEmitter = l;
        l.prototype._events = void 0;
        l.prototype._eventsCount = 0;
        l.prototype._maxListeners = void 0;
        var A = 10;
        function L(e) {
            if (typeof e != "function")
                throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }
        Object.defineProperty(l, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return A
            },
            set: function(e) {
                if (typeof e != "number" || e < 0 || F(e))
                    throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                A = e
            }
        });
        l.init = function() {
            (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null),
            this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0
        }
        ;
        l.prototype.setMaxListeners = function(t) {
            if (typeof t != "number" || t < 0 || F(t))
                throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
            return this._maxListeners = t,
            this
        }
        ;
        function O(e) {
            return e._maxListeners === void 0 ? l.defaultMaxListeners : e._maxListeners
        }
        l.prototype.getMaxListeners = function() {
            return O(this)
        }
        ;
        l.prototype.emit = function(t) {
            for (var n = [], r = 1; r < arguments.length; r++)
                n.push(arguments[r]);
            var o = t === "error"
              , i = this._events;
            if (i !== void 0)
                o = o && i.error === void 0;
            else if (!o)
                return !1;
            if (o) {
                var a;
                if (n.length > 0 && (a = n[0]),
                a instanceof Error)
                    throw a;
                var u = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
                throw u.context = a,
                u
            }
            var f = i[t];
            if (f === void 0)
                return !1;
            if (typeof f == "function")
                W(f, this, n);
            else
                for (var s = f.length, c = K(f, s), r = 0; r < s; ++r)
                    W(c[r], this, n);
            return !0
        }
        ;
        function H(e, t, n, r) {
            var o, i, a;
            if (L(n),
            i = e._events,
            i === void 0 ? (i = e._events = Object.create(null),
            e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n),
            i = e._events),
            a = i[t]),
            a === void 0)
                a = i[t] = n,
                ++e._eventsCount;
            else if (typeof a == "function" ? a = i[t] = r ? [n, a] : [a, n] : r ? a.unshift(n) : a.push(n),
            o = O(e),
            o > 0 && a.length > o && !a.warned) {
                a.warned = !0;
                var u = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                u.name = "MaxListenersExceededWarning",
                u.emitter = e,
                u.type = t,
                u.count = a.length,
                Ee(u)
            }
            return e
        }
        l.prototype.addListener = function(t, n) {
            return H(this, t, n, !1)
        }
        ;
        l.prototype.on = l.prototype.addListener;
        l.prototype.prependListener = function(t, n) {
            return H(this, t, n, !0)
        }
        ;
        function Te() {
            if (!this.fired)
                return this.target.removeListener(this.type, this.wrapFn),
                this.fired = !0,
                arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
        }
        function q(e, t, n) {
            var r = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            }
              , o = Te.bind(r);
            return o.listener = n,
            r.wrapFn = o,
            o
        }
        l.prototype.once = function(t, n) {
            return L(n),
            this.on(t, q(this, t, n)),
            this
        }
        ;
        l.prototype.prependOnceListener = function(t, n) {
            return L(n),
            this.prependListener(t, q(this, t, n)),
            this
        }
        ;
        l.prototype.removeListener = function(t, n) {
            var r, o, i, a, u;
            if (L(n),
            o = this._events,
            o === void 0)
                return this;
            if (r = o[t],
            r === void 0)
                return this;
            if (r === n || r.listener === n)
                --this._eventsCount === 0 ? this._events = Object.create(null) : (delete o[t],
                o.removeListener && this.emit("removeListener", t, r.listener || n));
            else if (typeof r != "function") {
                for (i = -1,
                a = r.length - 1; a >= 0; a--)
                    if (r[a] === n || r[a].listener === n) {
                        u = r[a].listener,
                        i = a;
                        break
                    }
                if (i < 0)
                    return this;
                i === 0 ? r.shift() : Me(r, i),
                r.length === 1 && (o[t] = r[0]),
                o.removeListener !== void 0 && this.emit("removeListener", t, u || n)
            }
            return this
        }
        ;
        l.prototype.off = l.prototype.removeListener;
        l.prototype.removeAllListeners = function(t) {
            var n, r, o;
            if (r = this._events,
            r === void 0)
                return this;
            if (r.removeListener === void 0)
                return arguments.length === 0 ? (this._events = Object.create(null),
                this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete r[t]),
                this;
            if (arguments.length === 0) {
                var i = Object.keys(r), a;
                for (o = 0; o < i.length; ++o)
                    a = i[o],
                    a !== "removeListener" && this.removeAllListeners(a);
                return this.removeAllListeners("removeListener"),
                this._events = Object.create(null),
                this._eventsCount = 0,
                this
            }
            if (n = r[t],
            typeof n == "function")
                this.removeListener(t, n);
            else if (n !== void 0)
                for (o = n.length - 1; o >= 0; o--)
                    this.removeListener(t, n[o]);
            return this
        }
        ;
        function N(e, t, n) {
            var r = e._events;
            if (r === void 0)
                return [];
            var o = r[t];
            return o === void 0 ? [] : typeof o == "function" ? n ? [o.listener || o] : [o] : n ? Ie(o) : K(o, o.length)
        }
        l.prototype.listeners = function(t) {
            return N(this, t, !0)
        }
        ;
        l.prototype.rawListeners = function(t) {
            return N(this, t, !1)
        }
        ;
        l.listenerCount = function(e, t) {
            return typeof e.listenerCount == "function" ? e.listenerCount(t) : j.call(e, t)
        }
        ;
        l.prototype.listenerCount = j;
        function j(e) {
            var t = this._events;
            if (t !== void 0) {
                var n = t[e];
                if (typeof n == "function")
                    return 1;
                if (n !== void 0)
                    return n.length
            }
            return 0
        }
        l.prototype.eventNames = function() {
            return this._eventsCount > 0 ? w(this._events) : []
        }
        ;
        function K(e, t) {
            for (var n = new Array(t), r = 0; r < t; ++r)
                n[r] = e[r];
            return n
        }
        function Me(e, t) {
            for (; t + 1 < e.length; t++)
                e[t] = e[t + 1];
            e.pop()
        }
        function Ie(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                t[n] = e[n].listener || e[n];
            return t
        }
        function Se(e, t) {
            return new Promise(function(n, r) {
                function o(a) {
                    e.removeListener(t, i),
                    r(a)
                }
                function i() {
                    typeof e.removeListener == "function" && e.removeListener("error", o),
                    n([].slice.call(arguments))
                }
                U(e, t, i, {
                    once: !0
                }),
                t !== "error" && _e(e, o, {
                    once: !0
                })
            }
            )
        }
        function _e(e, t, n) {
            typeof e.on == "function" && U(e, "error", t, n)
        }
        function U(e, t, n, r) {
            if (typeof e.on == "function")
                r.once ? e.once(t, n) : e.on(t, n);
            else if (typeof e.addEventListener == "function")
                e.addEventListener(t, function o(i) {
                    r.once && e.removeEventListener(t, o),
                    n(i)
                });
            else
                throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
        }
    }
    );
    var J = P((et,h)=>{
        h.exports.boot = function(e) {
            return e
        }
        ;
        h.exports.ssrMiddleware = function(e) {
            return e
        }
        ;
        h.exports.configure = function(e) {
            return e
        }
        ;
        h.exports.preFetch = function(e) {
            return e
        }
        ;
        h.exports.route = function(e) {
            return e
        }
        ;
        h.exports.store = function(e) {
            return e
        }
        ;
        h.exports.bexBackground = function(e) {
            return e
        }
        ;
        h.exports.bexContent = function(e) {
            return e
        }
        ;
        h.exports.bexDom = function(e) {
            return e
        }
        ;
        h.exports.ssrProductionExport = function(e) {
            return e
        }
        ;
        h.exports.ssrCreate = function(e) {
            return e
        }
        ;
        h.exports.ssrListen = function(e) {
            return e
        }
        ;
        h.exports.ssrClose = function(e) {
            return e
        }
        ;
        h.exports.ssrServeStaticContent = function(e) {
            return e
        }
        ;
        h.exports.ssrRenderPreloadTag = function(e) {
            return e
        }
    }
    );
    var X = D(V());
    var I, E = 0, m = new Array(256);
    for (let e = 0; e < 256; e++)
        m[e] = (e + 256).toString(16).substring(1);
    var ke = (()=>{
        let e = typeof crypto != "undefined" ? crypto : typeof window != "undefined" ? window.crypto || window.msCrypto : void 0;
        if (e !== void 0) {
            if (e.randomBytes !== void 0)
                return e.randomBytes;
            if (e.getRandomValues !== void 0)
                return t=>{
                    let n = new Uint8Array(t);
                    return e.getRandomValues(n),
                    n
                }
        }
        return t=>{
            let n = [];
            for (let r = t; r > 0; r--)
                n.push(Math.floor(Math.random() * 256));
            return n
        }
    }
    )()
      , z = 4096;
    function $() {
        (I === void 0 || E + 16 > z) && (E = 0,
        I = ke(z));
        let e = Array.prototype.slice.call(I, E, E += 16);
        return e[6] = e[6] & 15 | 64,
        e[8] = e[8] & 63 | 128,
        m[e[0]] + m[e[1]] + m[e[2]] + m[e[3]] + "-" + m[e[4]] + m[e[5]] + "-" + m[e[6]] + m[e[7]] + "-" + m[e[8]] + m[e[9]] + "-" + m[e[10]] + m[e[11]] + m[e[12]] + m[e[13]] + m[e[14]] + m[e[15]]
    }
    var Be = {
        undefined: ()=>0,
        boolean: ()=>4,
        number: ()=>8,
        string: e=>2 * e.length,
        object: e=>e ? Object.keys(e).reduce((t,n)=>S(n) + S(e[n]) + t, 0) : 0
    }
      , S = e=>Be[typeof e](e)
      , C = class extends X.EventEmitter {
        constructor(t) {
            super(),
            this.setMaxListeners(1 / 0),
            this.wall = t,
            t.listen(n=>{
                Array.isArray(n) ? n.forEach(r=>this._emit(r)) : this._emit(n)
            }
            ),
            this._sendingQueue = [],
            this._sending = !1,
            this._maxMessageSize = 32 * 1024 * 1024
        }
        send(t, n) {
            return this._send([{
                event: t,
                payload: n
            }])
        }
        getEvents() {
            return this._events
        }
        on(t, n) {
            return super.on(t, r=>{
                n({
                    ...r,
                    respond: o=>this.send(r.eventResponseKey, o)
                })
            }
            )
        }
        _emit(t) {
            typeof t == "string" ? this.emit(t) : this.emit(t.event, t.payload)
        }
        _send(t) {
            return this._sendingQueue.push(t),
            this._nextSend()
        }
        _nextSend() {
            if (!this._sendingQueue.length || this._sending)
                return Promise.resolve();
            this._sending = !0;
            let t = this._sendingQueue.shift()
              , n = t[0]
              , r = `${n.event}.${$()}`
              , o = r + ".result";
            return new Promise((i,a)=>{
                let u = []
                  , f = s=>{
                    if (s !== void 0 && s._chunkSplit) {
                        let c = s._chunkSplit;
                        u = [...u, ...s.data],
                        c.lastChunk && (this.off(o, f),
                        i(u))
                    } else
                        this.off(o, f),
                        i(s)
                }
                ;
                this.on(o, f);
                try {
                    let s = t.map(c=>({
                        ...c,
                        payload: {
                            data: c.payload,
                            eventResponseKey: o
                        }
                    }));
                    this.wall.send(s)
                } catch (s) {
                    let c = "Message length exceeded maximum allowed length.";
                    if (s.message === c && Array.isArray(n.payload)) {
                        let p = S(n);
                        if (p > this._maxMessageSize) {
                            let d = Math.ceil(p / this._maxMessageSize)
                              , y = Math.ceil(n.payload.length / d)
                              , x = n.payload;
                            for (let T = 0; T < d; T++) {
                                let ye = Math.min(x.length, y);
                                this.wall.send([{
                                    event: n.event,
                                    payload: {
                                        _chunkSplit: {
                                            count: d,
                                            lastChunk: T === d - 1
                                        },
                                        data: x.splice(0, ye)
                                    }
                                }])
                            }
                        }
                    }
                }
                this._sending = !1,
                setTimeout(()=>this._nextSend(), 16)
            }
            )
        }
    }
    ;
    var Y = (e,t)=>{
        window.addEventListener("message", n=>{
            if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
                let r = n.data[0]
                  , o = e.getEvents();
                for (let i in o)
                    i === r.event && o[i](r.payload)
            }
        }
        , !1)
    }
    ;
    var me = D(J());
    function Q(e) {
        window.sendMsgToSolverCS = function(t, n) {
            return new Promise((r,o)=>{
                let i = document.querySelector("body > solver-ext-messages");
                i || (i = document.createElement("solver-ext-messages"),
                i.style.display = "none",
                document.body.appendChild(i));
                let a = document.createElement("solver-ext-message");
                a.dataset.action = t,
                a.dataset.messageId = Date.now().valueOf().toString(),
                n && (a.dataset.data = encodeURIComponent(JSON.stringify(n))),
                i.appendChild(a);
                let u = setInterval(()=>{
                    if (a.dataset.response) {
                        try {
                            let f = JSON.parse(decodeURIComponent(a.dataset.response));
                            f.error ? o(new Error(f.error)) : r(f)
                        } catch {
                            o(new Error("Cannot parse message response"))
                        }
                        clearTimeout(u),
                        a.remove(),
                        i.childNodes.length || i.remove()
                    }
                }
                , 200)
            }
            )
        }
        ,
        setInterval(function() {
            let t = document.querySelector("textarea[id=capsolver-callback-trigger]");
            if (t) {
                let n = t.getAttribute("data-function")
                  , r = t.value;
                window[n] && window[n](r),
                t.remove()
            }
        }, 1e3),
        setInterval(function() {
            let t = document.querySelector("textarea[id=twocaptcha-autosubmit-code]");
            if (t) {
                let n = t.value.trim().split(`
`);
                t.remove();
                let r = null;
                for (let o = 0; o < n.length; o++) {
                    let i = JSON.parse(n[o]);
                    i.type === "source" ? (i.value === "window" && (r = window),
                    i.value === "document" && (r = document)) : i.type === "property" ? r = r[i.value] : i.type === "method" ? i.args && i.args.length ? r = r[i.value](...i.args) : r = r[i.value]() : i.type === "index" && (r = r[i.value])
                }
            }
        }, 1e3)
    }
    function v(e) {
        return new Promise(t=>setTimeout(t, e))
    }
    function g(e, t) {
        let n = t - e + 1;
        return Math.floor(Math.random() * n + e)
    }
    function _(e) {
        let t = e == null ? void 0 : e.getBoundingClientRect();
        return t ? {
            x: t.top + window.scrollY - document.documentElement.clientTop + g(-5, 5),
            y: t.left + window.scrollX - document.documentElement.clientLeft + g(-5, 5)
        } : {
            x: 0,
            y: 0
        }
    }
    var G = "hCaptcha"
      , Z = "0";
    var Pe = 1e3;
    function De(e) {
        if (e.dataset.sitekey)
            return e.dataset.sitekey;
        let t = e.querySelector("iframe");
        if (!t)
            return null;
        let n = t.src;
        return new URL(n.replace("#", "?")).searchParams.get("sitekey")
    }
    function ee(e) {
        setInterval(()=>{
            let t = document.querySelector("textarea[name=h-captcha-response]");
            if (!t)
                return;
            let n = t.parentNode;
            n.id || (n.id = "hcaptcha-container-" + Date.now());
            let r = {
                captchaType: G,
                widgetId: Z,
                containerId: n.id,
                sitekey: De(n),
                callback: n.dataset.callback || null,
                status: "ready"
            };
            e.send("registerCaptchaWidget", r).then()
        }
        , Pe)
    }
    function te(e) {
        let t = function(n) {
            var f;
            let r = {
                captchaType: "reCaptcha",
                widgetId: n.id,
                version: "v2",
                sitekey: null,
                action: null,
                s: null,
                callback: null,
                enterprise: !!((f = window == null ? void 0 : window.grecaptcha) != null && f.enterprise),
                containerId: null,
                bindedButtonId: null,
                status: "ready",
                invisible: !1
            }
              , o = !1
              , i = null
              , a = Object.keys(n);
            e: for (let s = 0; s < a.length; s++)
                if (typeof n[a[s]] == "object") {
                    for (let c in n[a[s]])
                        if (n[a[s]][c] && n[a[s]][c].classList && n[a[s]][c].classList.contains("grecaptcha-badge") && !["firstElementChild", "firstChild"].includes(c)) {
                            o = !0,
                            i = n[a[s]];
                            break e
                        }
                }
            if (o) {
                let s = [];
                for (let c in i)
                    typeof i[c] == "string" && s.push(i[c]);
                s.includes("fullscreen") ? r.invisible = !0 : (r.version = "v3",
                r.captchaType = "reCaptcha3")
            }
            let u;
            for (let s in n)
                if (n[s] && n[s].nodeType)
                    if (n[s].id)
                        r.containerId = n[s].id;
                    else if (n[s].dataset.sitekey)
                        n[s].id = "recaptcha-container-" + Date.now(),
                        r.containerId = n[s].id;
                    else {
                        if (!u) {
                            u = n[s];
                            continue
                        }
                        if (n[s].isSameNode(u)) {
                            n[s].id = "recaptcha-container-" + Date.now(),
                            r.containerId = n[s].id;
                            break
                        }
                    }
            for (let s in n) {
                let c = n[s];
                if (typeof c == "object") {
                    for (let p in c)
                        if (c[p] !== null && typeof c[p] == "object" && c[p].sitekey !== void 0 && c[p].action !== void 0)
                            for (let d in c[p]) {
                                if (d === "sitekey" && (r.sitekey = c[p][d]),
                                d === "action" && (r.action = c[p][d]),
                                d === "s" && (r.s = c[p][d]),
                                ["callback", "promise-callback"].includes(d)) {
                                    let y = c[p][d];
                                    r.callback = y
                                }
                                if (d === "bind" && c[p][d])
                                    if (typeof c[p][d] == "string")
                                        r.bindedButtonId = c[p][d];
                                    else {
                                        let y = c[p][d];
                                        y.id === void 0 && (y.id = "recaptchaBindedElement" + n.id),
                                        r.bindedButtonId = y.id
                                    }
                            }
                }
            }
            if (typeof r.callback == "function") {
                let s = "reCaptchaWidgetCallback" + n.id;
                window[s] = r.callback,
                r.callback = s
            }
            return r
        };
        return setInterval(()=>{
            if (window.___grecaptcha_cfg !== void 0 && window.___grecaptcha_cfg.clients !== void 0)
                for (let n in window.___grecaptcha_cfg.clients) {
                    let r = window.___grecaptcha_cfg.clients[n]
                      , o = t(r);
                    e.send("registerCaptchaWidget", o).then()
                }
        }
        , 2e3)
    }
    var ne = "funCaptcha"
      , re = "0";
    var We = 1e3;
    function oe(e) {
        let t = null;
        t && (clearInterval(t),
        t = null),
        t = setInterval(()=>{
            let n = document.querySelector('#FunCaptcha-Token[name="fc-token"]');
            if (!n)
                return;
            let r = document.querySelector("#FunCaptcha");
            r && !(r != null && r.id) && (r.id = "funcaptcha-container-" + Date.now());
            let a = n.value.split("|").filter(s=>s.startsWith("pk="))
              , u = a[0].slice(a[0].indexOf("=") + 1)
              , f = {
                captchaType: ne,
                widgetId: re,
                containerId: r == null ? void 0 : r.id,
                websitePublicKey: u,
                status: "ready"
            };
            r && e.send("registerCaptchaWidget", f).then()
        }
        , We)
    }
    function Ae(e, t, n, r, o) {
        let[i,a] = t
          , [u,f] = o
          , [s,c] = n
          , [p,d] = r
          , y = i * (1 - e) * (1 - e) * (1 - e) + 3 * s * e * (1 - e) * (1 - e) + 3 * p * e * e * (1 - e) + u * e * e * e
          , x = a * (1 - e) * (1 - e) * (1 - e) + 3 * c * e * (1 - e) * (1 - e) + 3 * d * e * e * (1 - e) + f * e * e * e;
        return [y, x]
    }
    function Fe(e, t, n=30) {
        let r = []
          , o = 0
          , i = 1;
        for (let p = 0; p < n; ++p)
            r.push(o),
            p < n * 1 / 10 ? i += g(60, 100) : p >= n * 9 / 10 && (i -= g(60, 100),
            i = Math.max(20, i)),
            o += i;
        let a = []
          , u = [e.x, e.y]
          , f = [(e.x + t.x) / 2 + g(30, 100) * 1, (e.y + t.y) / 2 + g(30, 100) * 1]
          , s = [(e.x + t.x) / 2 + g(30, 100) * 1, (e.y + t.y) / 2 + g(30, 100) * 1]
          , c = [t.x, t.y];
        for (let p of r) {
            let[d,y] = Ae(p / o, u, f, s, c);
            a.push({
                x: d,
                y
            })
        }
        return a
    }
    function Oe(e, t) {
        let n = Fe(e, t, g(15, 30));
        for (let r = 0; r < n.length; r++)
            document.body.dispatchEvent(new MouseEvent("mousemove",{
                bubbles: !0,
                clientX: n[r].x,
                clientY: n[r].y
            }))
    }
    function He({x: e, y: t}) {
        document.body.dispatchEvent(new MouseEvent("mousedown",{
            bubbles: !0,
            clientX: e,
            clientY: t
        }))
    }
    function qe({x: e, y: t}) {
        document.body.dispatchEvent(new MouseEvent("mouseup",{
            bubbles: !0,
            clientX: e,
            clientY: t
        }))
    }
    async function Ne(e, t) {
        Oe(e, t),
        await v(g(30, 80)),
        He(t),
        await v(g(30, 80)),
        qe(t)
    }
    async function je(e) {
        for (let t = 0; t < e.length - 1; t++)
            await Ne(e[t], e[t + 1])
    }
    function Ke(e, t, n) {
        let o = [n ? _(n) : {
            x: t ? g(420, 530) : g(10, 100),
            y: t ? g(200, 300) : g(5, 200)
        }];
        for (let i = 0; i < e.length; i++) {
            let a = _(e[i]);
            o.push(a)
        }
        return o
    }
    async function ie(e, t=null) {
        let n = Ke(e, !1, t);
        await je(n)
    }
    async function ae() {
        let e = document.querySelector("#challenge-stage > div > label > map > area")
          , t = document.querySelector("#branding");
        await v(500),
        ie([t, e]),
        e == null || e.click()
    }
    var se = "cloudflare"
      , ce = "0";
    function le(e) {
        let t = document.querySelector('input[name="cf-turnstile-response"]').parentElement;
        t.id || (t.id = "cloudflare-container-" + Date.now());
        let n = {
            captchaType: se,
            widgetId: ce,
            containerId: t.id,
            status: "ready"
        };
        e.send("registerCaptchaWidget", n).then()
    }
    function Ue() {
        let e = document.querySelector("#fail");
        return (e == null ? void 0 : e.style.display) !== "none"
    }
    function Ve() {
        let e = document.querySelector('input[name="cf-turnstile-response"]')
          , t = e == null ? void 0 : e.parentElement.querySelector("iframe")
          , n = t == null ? void 0 : t.src;
        return (n == null ? void 0 : n.match("challenges.cloudflare.com/cdn-cgi/challenge-platform/")) !== null
    }
    function ze() {
        return location.href.match("challenges.cloudflare.com/cdn-cgi/challenge-platform/") !== null
    }
    async function ue(e, t) {
        let n = 0;
        setInterval(async()=>{
            if (!(n >= t.cloudflareRepeatTimes))
                if (Ue() && n++,
                t.cloudflareMode === "click") {
                    if (!ze())
                        return;
                    await v(t.cloudflareDelayTime),
                    ae()
                } else {
                    if (!Ve())
                        return;
                    le(e)
                }
        }
        , 1e3)
    }
    var pe = "awsCaptcha"
      , fe = "0";
    function de(e) {
        setInterval(()=>{
            let t = document.querySelector("#captcha-container");
            if (!t || !t.querySelector(".amzn-captcha-lang-selector"))
                return;
            let r = {
                captchaType: pe,
                widgetId: fe,
                containerId: t.id,
                status: "ready"
            };
            e.send("registerCaptchaWidget", r).then()
        }
        , 1e3)
    }
    var he = (0,
    me.bexDom)(async e=>{
        $e(e).then(),
        Q(e)
    }
    );
    async function $e(e) {
        let {data: t} = await e.send("config");
        !t.useCapsolver || (t.enabledForHCaptcha && ee(e),
        (t.enabledForRecaptcha || t.enabledForRecaptchaV3) && te(e),
        t.enabledForCloudflare && ue(e, t),
        t.enabledForFunCaptcha && oe(e),
        t.enabledForAwsCaptcha && de(e))
    }
    var ge = new C({
        listen(e) {},
        send(e) {
            let t = {
                ...e,
                from: "bex-dom"
            };
            window.postMessage(t, "*")
        }
    });
    Y(ge, "bex-content-script");
    he(ge);
}
)();
