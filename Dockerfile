FROM evarga/jenkins-slave
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

RUN sed -i "s/exit 101/exit 0/g" /usr/sbin/policy-rc.d
RUN apt-get install -y mongodb
RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir /data
RUN mkdir /data/db
EXPOSE 22
CMD ["/usr/bin/supervisord"]
